import { QueryResolvers } from 'apps/__generated__/graphql';
import { AmpereContext } from '../types';
import { GraphQLError } from 'graphql';

const Query: QueryResolvers<AmpereContext> = {
  profile: (_, args, context) => {
    if (!context.user) {
      throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      });
    }

    return {
      id: context.user._id.toString(),
      email: context.user.email,
      name: context.user.name,
    };
  },
};

export default Query;
