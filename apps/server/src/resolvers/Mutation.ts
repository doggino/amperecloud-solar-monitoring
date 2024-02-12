import { MutationResolvers } from 'apps/__generated__/graphql';
import User from '../models/User';
import { sign } from 'jsonwebtoken';
import { jwtSecret } from '../config';
import { GraphQLError } from 'graphql';
import { NotAuthenticatedError, NotExistingError } from './errors';
import Facility from '../models/Facility';

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
  createFacility: async (_, args, context) => {
    if (!context.user) {
      throw NotAuthenticatedError();
    }

    return await Facility.create({
      ...args,
      owner: context.user._id,
    });
  },
  updateFacility: async (_, { id, name }, context) => {
    if (!context.user) {
      throw NotAuthenticatedError();
    }

    const facility = await Facility.findById(id).exec();

    if (!facility) {
      throw NotExistingError();
    }

    facility.name = name;
    await facility.save();

    return facility;
  },
  deleteFacility: async (_, { id }, context) => {
    if (!context.user) {
      throw NotAuthenticatedError();
    }

    const facilityDelete = await Facility.deleteOne({ _id: id }).exec();
    return facilityDelete.acknowledged && facilityDelete.deletedCount === 1;
  },
};

export default Mutation;
