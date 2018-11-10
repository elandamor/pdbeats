import { GraphQLServer, Options, PubSub } from 'graphql-yoga';
import * as algoliasearch from 'algoliasearch';
import { Prisma } from './generated/prisma';
import * as schema from './schema';
import { formatError } from './utils/apollo-errors';

const algolia = algoliasearch('1P95FYQWIB', '0ec2d1a43dc56546e220a32c6465fc67');

const options: Options = {
  formatError
};

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  ...schema,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  context: (req) => ({
    ...req,
    algolia,
    db: new Prisma({
      endpoint: 'https://eu1.prisma.sh/elandamor/pdbeats/dev', // the endpoint of the Prisma API
      debug: false, // log all GraphQL queries & mutations sent to the Prisma API
      // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
    }),
    pubsub,
  }),
})

// tslint:disable:no-console
server.start(options, () => console.log('Server is running on http://localhost:4000'));
