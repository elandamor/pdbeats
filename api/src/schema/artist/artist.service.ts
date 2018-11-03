import { Context } from '../../utils';

export class ArtistService {
  public create(input, context: Context, info) {
    return context.db.mutation.createArtist(
      {
        data: { ...input },
      },
      info,
    );
  }

  public async update(input, context: Context, info) {
    const { id, name } = input;
    const artistExists = await context.db.exists.Artist({ id });

    if (!artistExists) {
      throw new Error('Artist not found');
    }

    return context.db.mutation.updateArtist(
      {
        data: { name },
        where: { id },
      },
      info,
    );
  }

  public async delete(id, context: Context) {
    const artistExists = await context.db.exists.Artist({ id });

    if (!artistExists) {
      throw new Error(`Artist not found or you're not authorized to perform action`);
    }

    return context.db.mutation.deleteArtist({ where: { id } });
  }

  public findOne(id, context: Context, info) {
    return context.db.query.artist({ where: { id } }, info);
  }

  public findMany(input, context: Context, info) {
    const { first, last, after, before } = input;
    return context.db.query.artistsConnection(
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
