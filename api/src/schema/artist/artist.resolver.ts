/**
 *
 * Resolvers for Artist
 *
 */

import { Context } from '../../utils';
import { ArtistService } from './artist.service';

const service = new ArtistService();

export default {
  Mutation: {
    createArtist: (_, { input }, context: Context, info) =>
      service.create(input, context, info),
    deleteArtist: (_, { id }, context: Context) =>
      service.delete(id, context),
    updateArtist: (_, { input }, context: Context, info) =>
      service.update(input, context, info),
  },
  Query: {
    artist: (_, { id }, context: Context, info) =>
      service.findOne(id, context, info),
    artists: (_, args, context: Context, info) =>
      service.findMany(args, context, info),
  },
  Node: {
    __resolveType() {
      return null;
    }
  },
};
