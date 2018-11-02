/**
 *
 * Resolvers for Album
 *
 */

import { Context } from '../../utils';
import { AlbumService } from './album.service';

const service = new AlbumService();

export default {
  Mutation: {
    createAlbum: (_, { input }, context: Context, info) =>
      service.create(input, context, info),
    deleteAlbum: (_, { id }, context: Context) =>
      service.delete(id, context),
    updateAlbum: (_, { input }, context: Context, info) =>
      service.update(input, context, info),
  },
  Query: {
    album: (_, { id }, context: Context, info) =>
      service.findOne(id, context, info),
    albums: (_, args, context: Context, info) =>
      service.findMany(args, context, info),
  },
  Node: {
    __resolveType() {
      return null;
    }
  },
};
