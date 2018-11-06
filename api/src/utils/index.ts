import { PubSub } from 'graphql-yoga';
import { Prisma } from '../generated/prisma'

export interface Context {
  db: Prisma
  pubsub: PubSub
  request: any
  response: any
}
