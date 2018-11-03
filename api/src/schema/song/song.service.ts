import * as _ from 'lodash';
import { Context } from '../../utils';

export class SongService {
  private async createFeaturing(artist, context, info) {
    return await context.db.mutation.createArtist(
      {
        data: {
          alias: artist.alias,
          name: artist.name,
        },
      },
      info,
    );
  }

  private async songExists(input, context) {
    const { album, name } = input;

    const getSongs: { songs: Array<{ name: string }> } = await context.db.query.album({
      where: { alias: album.alias }
    }, `{ songs { name } }`);

    if (getSongs) {
      const songExists = Array.from(getSongs.songs).findIndex((song) => {
        return song.name.toLowerCase() === name.toLowerCase();
      }) !== -1;

      return songExists;
    }

    return false;
  }

  public async create(input, context: Context, info) {
    const { album, artists, featuring, name } = input;
    // Check if album exists.
    const albumExists = await context.db.exists.Album({
      alias: album.alias,
    });
    // Check if artist exists.
    const artistExists = await context.db.exists.Artist({
      alias: artists[0].alias,
    });
    // Check if featuring exists.
    const featuringExists = await context.db.exists.Artist({
      alias: featuring ? featuring.alias : '',
    });
    // If album and artist already exist...
    if (albumExists && artistExists) {
      // ...check if song doesn't already exist in album...
      const songExists = await this.songExists(input, context);

      if (!songExists) {
        // ...create feature artist in input if it doesnt exist ...
        let createdFeature;
        if (featuring && !featuringExists) {
          createdFeature = await this.createFeaturing(featuring, context, info);
        }
        // ...then create the song.
        return context.db.mutation.createSong(
          {
            data: {
              album: {
                connect: { alias: album.alias },
              },
              artists: {
                connect: { alias: artists[0].alias },
              },
              // Conditionally handle song with featured artist.
              ...(
                featuringExists &&
                {
                  featuring: {
                    connect: { alias: featuring.alias },
                  },
                }
              ),
              ...(
                createdFeature &&
                {
                  featuring: {
                    connect: { id: createdFeature.id },
                  },
                }
              ),
              name,
            },
          },
          info,
        );
      }
      // Only reaches here if the song already exists.
      throw new Error('Song already exists');
    }
    // Create artist if it doesn't exist
    let createdArtist;
    if (!artistExists) {
      createdArtist = await context.db.mutation.createArtist(
        {
          data: {
            alias: artists[0].alias,
            name: artists[0].name,
          },
        },
        info,
      );
    }
    // Create album if it doesn't exist
    let createdAlbum;
    if (!albumExists) {
      createdAlbum = await context.db.mutation.createAlbum(
        {
          data: {
            alias: album.alias,
            artists: {
              connect: {
                ...(
                  createdArtist
                  ? { id: createdArtist.id }
                  : { alias: artists[0].alias }
                ),
              },
            },
            name: album.name,
          },
        },
        info,
      );
    }
    // Create feature artist in input
    let createdFeature;
    if (featuring) {
      createdFeature = await this.createFeaturing(featuring, context, info);
    }
    // If album and artist did not exist and have benn created...
    if (createdAlbum && createdArtist) {
      // ...create the song
      return context.db.mutation.createSong(
        {
          data: {
            album: {
              connect: {
                id: createdAlbum.id,
              },
            },
            artists: {
              connect: {
                id: createdArtist.id,
              },
            },
            // Conditionally handle song with featured artist
            ...(
              createdFeature &&
              {
                featuring: {
                  connect: {
                    id: createdFeature.id,
                  }
                }
              }
            ),
            name,
          },
        },
        info,
      );
    }
  }

  public async update(input, context: Context, info) {
    const { id, name } = input;
    const songExists = await context.db.exists.Song({ id });

    if (!songExists) {
      throw new Error('Song not found');
    }

    return context.db.mutation.updateSong(
      {
        data: { name },
        where: { id },
      },
      info,
    );
  }

  public async delete(id, context: Context) {
    const songExists = await context.db.exists.Song({ id });

    if (!songExists) {
      throw new Error(`Song not found or you're not authorized to perform action`);
    }

    return context.db.mutation.deleteSong({ where: { id } });
  }

  public findOne(id, context: Context, info) {
    return context.db.query.song({ where: { id } }, info);
  }

  public findMany(input, context: Context, info) {
    const { first, last, after, before } = input;
    return context.db.query.songsConnection(
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
