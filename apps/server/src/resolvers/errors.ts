import { GraphQLError } from 'graphql';

export const NotAuthenticatedError = () =>
  new GraphQLError('User is not authenticated', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  });

export const NotExistingError = () =>
  new GraphQLError('The item is not existing', {
    extensions: {
      code: 'NOT_EXISTING',
    },
  });
