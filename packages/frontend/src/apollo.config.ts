import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, split } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { formatError, formatMessage } from './utils';

import introspectionQueryResultData from './fragmentTypes';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:4000'
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true
  }
});

const retryLink = new RetryLink();

const errorLink = onError(({ graphQLErrors, networkError, operation }: any) => {
  if (graphQLErrors) {
    const errorType = 'graphQLError';
    const group = formatMessage(errorType, operation);

    console.groupCollapsed(...group);

    graphQLErrors.map(({ message, path }: any) => {
      const error = formatError(message, path);
      console.log(...error);
      return { message, path };
    });

    // @ts-ignore
    console.groupEnd(...group);
  }

  if (networkError) {
    const errorType = 'networkError';
    const group = formatMessage(errorType, operation);

    console.groupCollapsed(...group);

    const error = formatError(networkError.message);
    console.log(...error);

    // @ts-ignore
    console.groupEnd(...group);
  }
});

const loggerLink = new ApolloLink(
  (operation, forward): any => {
    const startTime = new Date().getTime();

    return (
      forward &&
      forward(operation).map((result) => {
        // @ts-ignore
        const operationType = operation.query.definitions[0].operation;
        const elapsed = new Date().getTime() - startTime;

        const group = formatMessage(operationType, operation, elapsed);
        console.groupCollapsed(...group);

        console.log('INIT', operation);
        console.log('RESULT', result);

        // @ts-ignore
        console.groupEnd(...group);

        return result;
      })
    );
  }
);

const devHttpLink = ApolloLink.from([
  loggerLink,
  errorLink,
  retryLink,
  httpLink,
]);

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation }: any = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  devHttpLink,
);

const client = new ApolloClient({
  link,
  cache
});

export default client;
