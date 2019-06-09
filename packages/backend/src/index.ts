import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import * as algoliasearch from 'algoliasearch';
import { importSchema } from 'graphql-import';

import { Prisma } from './generated/prisma';
import * as defaultSchema from './schema';
import { formatError } from './utils/apollo-errors';

const algolia = algoliasearch('1P95FYQWIB', '0ec2d1a43dc56546e220a32c6465fc67');

const options: any = {
  formatError
};

const typeDefs = importSchema('./src/schema.graphql');
const schema = makeExecutableSchema({
  typeDefs,
  ...defaultSchema,
  resolverValidationOptions: { requireResolversForResolveType: false },
});

const server = new ApolloServer({
  schema,
  context: (req) => ({
    ...req,
    algolia,
    db: new Prisma({
      endpoint: 'https://eu1.prisma.sh/elandamor/pdbeats/dev', // the endpoint of the Prisma API
      debug: false, // log all GraphQL queries & mutations sent to the Prisma API
      // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
    }),
    userId: 'cjo6yn74ycxqx0a42rrsl3blv',
  }),
})

// tslint:disable:no-console
// server.listen(options, () => console.log('Server is running on http://localhost:4000'));
// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
