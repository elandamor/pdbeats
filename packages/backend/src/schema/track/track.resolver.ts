/**
 *
 * Resolvers for Track
 *
 */

import { Context } from '../../utils';
import { TrackService } from './track.service';

const service = new TrackService();

export default {
  Mutation: {
    createTrack: (_, { input }, context: Context, info) =>
      service.create(input, context, info),
    deleteTrack: (_, { id }, context: Context) =>
      service.delete(id, context),
    updateTrack: (_, { input }, context: Context, info) =>
      service.update(input, context, info),
  },
  Query: {
    tracks: (_, args, context: Context, info) =>
      service.findMany(args, context, info),
    track: (_, { id }, context: Context, info) =>
      service.findOne(id, context, info),
  },
  Subscription: {
    trackCreated: {
      subscribe: (_,__,{ pubsub }) => pubsub.asyncIterator('TRACK_CREATED'),
    }
  },
  Node: {
    __resolveType() {
      return null;
    }
  },
};
