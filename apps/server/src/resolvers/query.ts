import { QueryResolvers } from 'apps/__generated__/graphql';
import { AmpereContext } from '../types';

const Query: QueryResolvers<AmpereContext> = {
  profile: (_, args, context) => {
    if (!context.user) {
      return null;
    }

    return {
      id: context.user._id.toString(),
      email: context.user.email,
      name: context.user.name,
    };
  },
};

export default Query;
