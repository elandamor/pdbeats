import { GraphQLServer } from 'graphql-yoga'
import { Prisma } from './generated/prisma'
import * as schema from './schema';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  ...schema,
  context: req => ({
    ...req,
    db: new Prisma({
      endpoint: 'https://eu1.prisma.sh/elandamor/pdbeats/dev', // the endpoint of the Prisma API
      debug: true, // log all GraphQL queries & mutations sent to the Prisma API
      // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
    }),
  }),
})
server.start(() => console.log('Server is running on http://localhost:4000'))
