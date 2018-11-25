import { Context } from '../../utils';
import { AlbumExistsError, NodeNotFoundError, UnknownError } from '../../utils/errors';
import { TrackCreateWithoutAlbumInput } from '../../generated/prisma';

export class AlbumService {
  /**
   * Creates an album
   * @param input
   * @param context
   * @param info
   */
  public async create(input, context: Context, info) {
    // TODO: Sanitize input from frontend
    const { alias, artists, artwork, genres, name, releaseDate, releaseType, tracks } = input;
    // Check if album exists.
    const albumExists = await context.db.exists.Album({ alias });

    if (!albumExists) {
      const mainArtists = await this.artistFactory(artists, context);
      // Get number of tracks
      const numTracks = tracks ? tracks.length : 0;
      // Get duration of album
      const initialValue = 0;
      const duration = tracks ? tracks.reduce((accumulator, currentValue) =>
        accumulator + currentValue.duration , initialValue
      ) : 0;

      const createObject = (arr) => new Promise<Array<TrackCreateWithoutAlbumInput>>((resolve) => {
        const OBJECTS = [];

        arr.forEach((track, idx) => {
          this.artistFactory(track.artists, context).then((ARTISTS) => {
            this.artistFactory(track.featuring, context)
            .then((FEATURED_ARTISTS) => {
              const object: TrackCreateWithoutAlbumInput = {
                artists: {
                  connect: ARTISTS
                },
                ...(FEATURED_ARTISTS && {
                  featuring: { connect: FEATURED_ARTISTS},
                }),
                name: track.name,
                duration: track.duration,
                trackNumber: track.trackNumber
              };

              OBJECTS.push(object);

              if (idx === arr.length - 1) {
                resolve(OBJECTS);
              }
            });
          }).catch((error) => {
            throw new UnknownError({
              message: error.message,
            })
          });
        });
      });

      const tracksToCreate = await createObject(tracks);

      const dbAlbum = await context.db.mutation.createAlbum(
        {
          data: {
            alias,
            artists: {
              connect: mainArtists,
            },
            artwork: {
              create: {
                url: artwork.url,
                uploadedBy: {
                  connect: {
                    id: context.userId,
                  }
                }
              }
            },
            duration,
            ...(genres && {
              genres: {
                set: genres,
              }
            }),
            name,
            numTracks,
            releaseDate,
            releaseType,
            ...(tracksToCreate && {
              tracks: {
                create: tracksToCreate,
              }
            }),
          },
        },
        info,
      );

      const index = context.algolia.initIndex('albums');
      index.addObject({
        objectID: dbAlbum.id,
        object: dbAlbum,
      }, (err) => {
        if (err) {
          throw new UnknownError({
            message: err.message,
          })
        }
      });

      context.pubsub.publish('ALBUM_CREATED', {
        albumCreated: dbAlbum,
      });

      return dbAlbum;
    }

    throw new AlbumExistsError();
  }

  /**
   * Updates an album
   * @param input
   * @param context
   * @param info
   */
  public async update(input, context: Context, info) {
    const { alias, artists, artwork, genres, id, name, releaseDate, releaseType } = input;
    const albumExists = await context.db.exists.Album({ id });

    if (!albumExists) {
      throw new NodeNotFoundError({
        message: `Album:id:${id} could not be found`
      });
    }

    // Check artists currently in db for given album.
    const { artists: currentArtists } = await context.db.query.album({
      where: {
        id,
      }
    },
    `{
      artists {
        id
        alias
      }
    }`);
    // Find values that are in currentArtists but not in artists
    const MISSING_ARTISTS = currentArtists.filter((obj) =>
      !artists.some((obj2) => obj.alias === obj2.alias)
    );
    // Get artists that no longer exist in user input (to disconnect)
    const artistsToDisconnect = MISSING_ARTISTS.map((artist) => {
      const object = { id: artist.id };

      return object;
    });

    const albumArtists = await this.artistFactory(artists, context);

    const dbAlbum = await context.db.mutation.updateAlbum(
      {
        data: {
          alias,
          ...(
            albumArtists && {
              artists: {
                connect: albumArtists,
                ...(artistsToDisconnect.length > 0 && {
                  disconnect: artistsToDisconnect,
                })
              }
            }
          ),
          artwork: {
            ...(artwork.id ? {
              connect: {
                id: artwork.id,
              }
            } : {
              create: {
                url: artwork.url,
                uploadedBy: {
                  connect: {
                    id: context.userId,
                  }
                }
              }
            })
          },
          ...(genres && {
            genres: {
              set: genres,
            }
          }),
          name,
          releaseDate,
          releaseType
        },
        where: { id },
      },
      info,
    );

    const index = context.algolia.initIndex('albums');
    index.saveObject({
      objectID: id,
      object: dbAlbum,
    }, (err) => {
      if (err) {
        throw new UnknownError({
          message: err.message,
        })
      }
    });

    context.pubsub.publish('ALBUM_UPDATED', {
      albumUpdated: dbAlbum,
    });

    return dbAlbum;
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

    const dbAlbum = await context.db.mutation.deleteAlbum({ where: { id } });

    const index = context.algolia.initIndex('albums');
    index.deleteObject(id, (err) => {
      if (err) {
        throw new UnknownError({
          message: err.message,
        })
      }
    });

    context.pubsub.publish('ALBUM_DELETED', {
      albumDeleted: { id: dbAlbum.id, name: dbAlbum.name },
    });

    return dbAlbum;
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
        orderBy: 'name_ASC',
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
    if (!artists) {
      return;
    }

    const _createArtists = (arr) => new Promise<Array<{ alias: string }>>((resolve) => {
      const CREATED_ARTISTS = [];

      arr.forEach((artist, index) => {
        context.db.mutation.createArtist(
          {
            data: {
              alias: artist.alias,
              name: artist.name,
            },
          },
          `{ alias }`,
        ).then((CREATED_ARTIST) => {
          CREATED_ARTISTS.push({ alias: CREATED_ARTIST.alias });

          if (index === arr.length - 1) {
            resolve(CREATED_ARTISTS);
          }
        });
      })
    });

    const EXISTING_ARTISTS = await context.db.query.artists({
      where: {
        alias_in: artists.map((artist) => artist.alias),
      }
    });

    if (EXISTING_ARTISTS.length === 0) {
      return _createArtists(artists);
    }

    if (EXISTING_ARTISTS.length > 0 && EXISTING_ARTISTS.length < artists.length) {
      // Find values that are in EXISTING_ARTISTS but not in artists
      const uniqueResultOne = EXISTING_ARTISTS.filter((obj) =>
        !artists.some((obj2) => obj.alias === obj2.alias)
      );

      // Find aliases that are in artists but not in EXISTING_ARTISTS
      const uniqueResultTwo = artists.filter((obj) =>
        !EXISTING_ARTISTS.some((obj2) => obj.alias === obj2.alias)
      );

      // Combine the two arrays of unique entries
      const NEW_ARTISTS = uniqueResultOne.concat(uniqueResultTwo);

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
}
