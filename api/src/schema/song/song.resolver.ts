/**
 *
 * Resolvers for Song
 *
 */

import { Context } from '../../utils';
import { SongService } from './song.service';

const service = new SongService();

export default {
  Mutation: {
    createSong: (_, { input }, context: Context, info) =>
      service.create(input, context, info),
    deleteSong: (_, { id }, context: Context) =>
      service.delete(id, context),
    updateSong: (_, { input }, context: Context, info) =>
      service.update(input, context, info),
  },
  Query: {
    songs: (_, args, context: Context, info) =>
      service.findMany(args, context, info),
    song: (_, { id }, context: Context, info) =>
      service.findOne(id, context, info),
  },
  Node: {
    __resolveType() {
      return null;
    }
  },
};
