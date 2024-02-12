import { QueryResolvers } from 'apps/__generated__/graphql';
import { NotAuthenticatedError } from './errors';
import Facility from '../models/Facility';

const Query: QueryResolvers = {
  profile: (_, args, context) => {
    if (!context.user) return null;

    return context.user;
  },
  facilities: async (_, args, context) => {
    if (!context.user) {
      throw NotAuthenticatedError();
    }

    return await Facility.find({ owner: context.user._id }).exec();
  },
};

export default Query;
