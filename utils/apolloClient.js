import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const apiEndpoint = process.env.API_ENDPOINT || 'http://localhost:4000/api/graphql';
const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: apiEndpoint,
  fetchOptions: {
    credentials: 'include',
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  cache,
  link: from([errorLink, httpLink]),
});

export default client;
