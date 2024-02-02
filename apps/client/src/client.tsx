import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
} from '@apollo/client';
import { graphqlURL } from './config';
import { createFragmentRegistry } from '@apollo/client/cache';
import { FACILITY_FRAGMENT } from './utils';

const httpLink = new HttpLink({
  uri: graphqlURL,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || null,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    fragments: createFragmentRegistry(FACILITY_FRAGMENT),
  }),
  link: concat(authMiddleware, httpLink),
});

export default client;
