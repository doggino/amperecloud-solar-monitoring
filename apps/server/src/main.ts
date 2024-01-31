import { readFileSync } from 'fs';
import { connect, set } from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import { resolvers } from './resolvers';
import { mongoUri, port } from './config';
import { getUserFromToken } from './models/User';
import { AmpereContext } from './types';
import cors from 'cors';
import { UserDatasource } from './datasources';

const typeDefs = readFileSync('./apps/server/src/schema.graphql', {
  encoding: 'utf-8',
});

const startServer = async () => {
  const apolloServer = new ApolloServer<AmpereContext>({
    typeDefs: [DIRECTIVES, typeDefs],
    resolvers,
  });
  await apolloServer.start();
  const apolloMiddleware = expressMiddleware<AmpereContext>(apolloServer, {
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      const user = await getUserFromToken(token);

      return {
        user,
        userDatasource: new UserDatasource(),
      };
    },
  });

  const expressApp = express();

  expressApp.use(cors());
  expressApp.use(bodyParser.json({ limit: '50mb' }));
  expressApp.use('/graphql', apolloMiddleware);

  await new Promise<void>((resolve) => expressApp.listen(port, resolve));

  console.log(`🚀 Server listening at ${port}`);

  await connect(mongoUri);
  set('debug', true);

  console.log('MongoDB Connected');
};

startServer().catch((err) => console.error(err));
