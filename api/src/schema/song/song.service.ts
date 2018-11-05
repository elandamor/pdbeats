import * as _ from 'lodash';
import { Context } from '../../utils';

export class SongService {
  /**
   * Creates a song
   * @param input
   * @param context
   * @param info
   */
  public async create(input, context: Context, info) {
    // TODO: Sanitize input from frontend
    const { album, artists, featuring, name } = input;
    // Check if song already exists...
    const songExists = await this.songExists(input, context);

    if (!songExists) {
      // TODO: Give this better naming (holds response from artistFactory for main artists)
      const artistsPlug = await this.artistFactory(artists, context);
      // TODO: Give this better naming (holds response from artistFactory for featuring artists)
      const featuringPlug = await this.artistFactory(featuring, context);
      // Check if album exists.
      const albumExists = await context.db.exists.Album({
        alias: album.alias,
      });
      // If album already exist...
      if (albumExists) {
        // ...then create the song.
        const dbSong = context.db.mutation.createSong(
          {
            data: {
              album: {
                connect: { alias: album.alias },
              },
              artists: {
                connect: artistsPlug,
              },
              // Conditionally handle song with featured artist(s).
              ...(
                featuring &&
                {
                  featuring: {
                    connect: featuringPlug
                  }
                }
              ),
              name,
            },
          },
          info,
        );

        context.pubsub.publish('SONG_CREATED', {
          songCreated: dbSong,
        });

        return dbSong;
      }
      // Create album if it doesn't exist
      let createdAlbum;
      if (!albumExists) {
        createdAlbum = await context.db.mutation.createAlbum(
          {
            data: {
              alias: album.alias,
              artists: {
                connect: artistsPlug,
              },
              name: album.name,
            },
          },
          info,
        );
      }
      // If album didn't exist and has been created...
      if (createdAlbum) {
        // ...create the song
        const dbSong = await context.db.mutation.createSong(
          {
            data: {
              album: {
                connect: {
                  id: createdAlbum.id,
                },
              },
              artists: {
                connect: artistsPlug,
              },
              // Conditionally handle song with featured artist(s).
              ...(
                featuring &&
                {
                  featuring: {
                    connect: featuringPlug
                  }
                }
              ),
              name,
            },
          },
          info,
        );

        context.pubsub.publish('SONG_CREATED', {
          songCreated: dbSong,
        });

        return dbSong;
      }
    }
    // Only reaches here if the song already exists.
    throw new Error('EXISTS');
  }

  /**
   * Updates a song
   * @param input
   * @param context
   * @param info
   */
  public async update(input, context: Context, info) {
    const { id, name } = input;
    const songExists = await context.db.exists.Song({ id });

    if (!songExists) {
      throw new Error('NOT_FOUND');
    }

    return context.db.mutation.updateSong(
      {
        data: { name },
        where: { id },
      },
      info,
    );
  }

  /**
   * Deletes a song
   * @param id
   * @param context
   */
  public async delete(id, context: Context) {
    const songExists = await context.db.exists.Song({ id });

    if (!songExists) {
      throw new Error('NOT_FOUND');
    }

    return context.db.mutation.deleteSong({ where: { id } });
  }

  /**
   * Returns a song
   * @param id
   * @param context
   * @param info
   */
  public findOne(id, context: Context, info) {
    return context.db.query.song({ where: { id } }, info);
  }

  /**
   * Returns a collection of songs
   * @param input
   * @param context
   * @param info
   */
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

  /**
   * Handles the creation of artists
   * @param artists
   * @param context
   */
  private async artistFactory(artists, context: Context) {
    const _createArtists = (arr) => new Promise<Array<{ alias: string }>>((resolve) => {
      const CREATED_ARTISTS = [];

      arr.forEach(async (artist, index) => {
        const CREATED_ARTIST = await context.db.mutation.createArtist(
          {
            data: {
              alias: artist.alias,
              name: artist.name,
            },
          },
          `{ alias }`,
        );

        CREATED_ARTISTS.push({ alias: CREATED_ARTIST.alias });

        if (index === arr.length - 1) {
          resolve(CREATED_ARTISTS);
        }
      })
    });

    if (!artists) {
      return;
    }

    const EXISTING_ARTISTS = await context.db.query.artists({
      where: {
        alias_in: artists.map((artist) => artist.alias),
      }
    });

    if (EXISTING_ARTISTS.length === 0) {
      return _createArtists(artists);
    }

    if (EXISTING_ARTISTS.length > 0 && EXISTING_ARTISTS.length < artists.length) {
      const NEW_ARTISTS =  EXISTING_ARTISTS.map((artist) => {
        const [FILTERED_ARTISTS] = artists.filter((item) => {
          return item.alias !== artist.alias;
        });
        return FILTERED_ARTISTS;
      });

      const CREATED_ARTISTS = await _createArtists(NEW_ARTISTS);
      const CLEANED_EXISTING_ARTISTS  = EXISTING_ARTISTS.map((artist) => {
        const obj = {
          alias: artist.alias,
        };

        return obj;
      });

      return CLEANED_EXISTING_ARTISTS.concat(CREATED_ARTISTS);
    }

    if (EXISTING_ARTISTS.length === artists.length) {
      const ALIASES = artists.map((artist) => {
        const obj = {
          alias: artist.alias,
        };

        return obj;
      });

      return ALIASES;
    }
  }

  /**
   * Checks if a song exists in the database
   * @param input
   * @param context
   */
  private async songExists(input, context) {
    const { album, name } = input;

    const getSongs: { songs: Array<{ name: string }> } = await context.db.query.album({
      where: { alias: album.alias }
    }, `{ songs { name } }`);

    if (getSongs) {
      const songExists = Array.from(getSongs.songs).findIndex((song) =>
        song.name.toLowerCase() === name.toLowerCase()
      ) !== -1;

      return songExists;
    }

    return false;
  }
}
