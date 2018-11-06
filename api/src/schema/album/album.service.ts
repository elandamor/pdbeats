import { Context } from '../../utils';
import { NodeNotFoundError } from '../../utils/errors';

export class AlbumService {
  /**
   * Creates an album
   * @param input
   * @param context
   * @param info
   */
  public create(input, context: Context, info) {
    return context.db.mutation.createAlbum(
      {
        data: { ...input },
      },
      info,
    );
  }

  /**
   * Updates an album
   * @param input
   * @param context
   * @param info
   */
  public async update(input, context: Context, info) {
    const { id, name } = input;
    const albumExists = await context.db.exists.Album({ id });

    if (!albumExists) {
      throw new NodeNotFoundError({
        message: `Album:id:${id} could not be found`
      });
    }

    return context.db.mutation.updateAlbum(
      {
        data: { name },
        where: { id },
      },
      info,
    );
  }

  /**
   * Deletes an album
   * @param id
   * @param context
   */
  public async delete(id, context: Context) {
    const albumExists = await context.db.exists.Album({ id });

    if (!albumExists) {
      throw new NodeNotFoundError({
        message: `Album:id:${id} could not be found`
      });
    }

    return context.db.mutation.deleteAlbum({ where: { id } });
  }

  /**
   * Returns an album
   * @param id
   * @param context
   * @param info
   */
  public findOne(id, context: Context, info) {
    return context.db.query.album({ where: { id } }, info);
  }

  /**
   * Returns a collection of albums
   * @param input
   * @param context
   * @param info
   */
  public findMany(input, context: Context, info) {
    const { first, last, after, before } = input;
    return context.db.query.albumsConnection(
      {
        after,
        before,
        first,
        last,
        orderBy: 'createdAt_DESC',
      },
      info,
    );
  }
}
