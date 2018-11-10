import { PubSub } from 'graphql-yoga';
import { Client } from 'algoliasearch';
import { Prisma } from '../generated/prisma'

export interface Context {
  algolia: Client,
  db: Prisma
  pubsub: PubSub
  request: any
  response: any
}
