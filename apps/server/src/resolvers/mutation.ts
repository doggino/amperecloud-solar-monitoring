import { MutationResolvers } from 'apps/__generated__/graphql';
import User from '../models/User';
import { sign } from 'jsonwebtoken';
import { jwtSecret } from '../config';
import { GraphQLError } from 'graphql';

const Mutation: MutationResolvers = {
  signUp: async (_, args) => {
    if (await User.findOne({ email: args.email }).exec()) {
      throw new GraphQLError('Cannot create a user with the same email!', {
        extensions: {
          code: 'EMAIL_DUPLICATED',
        },
      });
    }

    const user = await User.create(args);
    const payload = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };

    return {
      ...payload,
      token: sign(payload, jwtSecret, { expiresIn: '1d' }),
    };
  },
  signIn: async (_, { email, password }) => {
    const user = await User.findOne({ email }).exec();
    const payload = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };

    if (user.checkPassword(password)) {
      return {
        ...payload,
        token: sign(payload, jwtSecret, { expiresIn: '1d' }),
      };
    } else {
      throw Error('Email or Password is invalid');
    }
  },
};

export default Mutation;
