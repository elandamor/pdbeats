import { Context } from '../../utils';
import { NodeNotFoundError } from '../../utils/errors';

export class ArtistService {
  /**
   * Creates an artist
   * @param input
   * @param context
   * @param info
   */
  public create(input, context: Context, info) {
    return context.db.mutation.createArtist(
      {
        data: { ...input },
      },
      info,
    );
  }

  /**
   * Updates an artist
   * @param input
   * @param context
   * @param info
   */
  public async update(input, context: Context, info) {
    const { id, name } = input;
    const artistExists = await context.db.exists.Artist({ id });

    if (!artistExists) {
      throw new NodeNotFoundError({
        message: `Artist:id:${id} could not be found`
      });
    }

    return context.db.mutation.updateArtist(
      {
        data: { name },
        where: { id },
      },
      info,
    );
  }

  /**
   * Deletes an artist
   * @param id
   * @param context
   */
  public async delete(id, context: Context) {
    const artistExists = await context.db.exists.Artist({ id });

    if (!artistExists) {
      throw new NodeNotFoundError({
        message: `Artist:id:${id} could not be found`
      });
    }

    return context.db.mutation.deleteArtist({ where: { id } });
  }

  /**
   * Returns an artist
   * @param id
   * @param context
   * @param info
   */
  public findOne(id, context: Context, info) {
    return context.db.query.artist({ where: { id } }, info);
  }

  /**
   * Returns a collection of artists
   * @param input
   * @param context
   * @param info
   */
  public findMany(input, context: Context, info) {
    const { first, last, after, before } = input;

    return context.db.query.artistsConnection(
      {
        after,
        before,
        first,
        last,
        orderBy: 'name_ASC',
        where: {
          albums_some: {
            numTracks_gt: 0
          }
        }
      },
      info,
    );
  }
}
