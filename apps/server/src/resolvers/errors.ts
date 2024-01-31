import { GraphQLError } from 'graphql';

export const NotAuthenticatedError = () =>
  new GraphQLError('User is not authenticated', {
    extensions: {
      code: 'UNAUTHENTICATED',
      http: {
        status: 401,
      },
    },
  });

export const NotExistingError = () =>
  new GraphQLError('The item is not existing', {
    extensions: {
      code: 'NOT_EXISTING',
    },
  });
