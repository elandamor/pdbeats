import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import ALBUMS from '../data/albums';
import ARTISTS from '../data/artists';

const defaultState = {
  albums: {
    edges: ALBUMS,
    __typename: 'AlbumsConnection',
  },
  artists: {
    edges: ARTISTS,
    __typename: 'ArtistConnection',
  }
};

const resolvers = {};

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      getAlbum: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'Album', id: args.id }),
      getArtist: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'Artist', id: args.id })
    },
  },
});

const stateLink = withClientState({ cache, resolvers, defaults: defaultState });

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

const devHttpLink = ApolloLink.from([
  stateLink,
  httpLink,
]);

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
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
