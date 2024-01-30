import { readFileSync } from 'fs';
import { connect } from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import { resolvers } from './resolvers';
import { mongoUri, port } from './config';
import { getUserFromToken } from './models/User';
import { AmpereContext } from './types';

const typeDefs = readFileSync('./apps/server/src/schema.graphql', {
  encoding: 'utf-8',
});

const startServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs: [DIRECTIVES, typeDefs],
    resolvers,
  });
  await apolloServer.start();
  const apolloMiddleware = expressMiddleware<AmpereContext>(apolloServer, {
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      const user = await getUserFromToken(token);

      return { user };
    },
  });

  const expressApp = express();

  expressApp.use(bodyParser.json({ limit: '50mb' }));
  expressApp.use('/graphql', apolloMiddleware);

  await new Promise<void>((resolve) => expressApp.listen(port, resolve));

  console.log(`🚀 Server listening at ${port}`);

  await connect(mongoUri);

  console.log('MongoDB Connected');
};

startServer().catch((err) => console.error(err));
