import { Context } from '../../utils';
import { NodeNotFoundError, TrackExistsError, UnknownError } from '../../utils/errors';

export class TrackService {
  /**
   * Creates a track
   * @param input
   * @param context
   * @param info
   */
  public async create(input, context: Context, info) {
    // TODO: Sanitize input from frontend
    const { album, artists, duration, featuring, name, trackNumber } = input;
    // Check if track already exists...
    const trackExists = await this.trackExists(input, context);

    if (!trackExists) {
      const mainArtists = await this.artistFactory(artists, context);
      const featuringArtists = await this.artistFactory(featuring, context);
      // Check if album exists.
      const albumExists = await context.db.exists.Album({
        alias: album.alias,
      });
      // If album already exist...
      if (albumExists) {
        // ...then create the track.
        const dbTrack = await context.db.mutation.createTrack(
          {
            data: {
              album: {
                connect: { alias: album.alias },
              },
              artists: {
                connect: mainArtists,
              },
              // Conditionally handle track with featured artist(s).
              ...(
                featuring &&
                {
                  featuring: {
                    connect: featuringArtists,
                  }
                }
              ),
              duration,
              name,
              trackNumber,
            },
          },
          `
            name
            artists { name }
            featuring { name }
            album { name }
            genre
          `,
        );

        const index = context.algolia.initIndex('tracks');
        index.addObject({
          objectID: dbTrack.id,
          object: dbTrack,
        }, (err) => {
          if (err) {
            throw new UnknownError({
              message: err.message,
            })
          }
        });

        context.pubsub.publish('TRACK_CREATED', {
          trackCreated: dbTrack,
        });

        return dbTrack;
      }
      // Create album if it doesn't exist
      let createdAlbum;
      if (!albumExists) {
        createdAlbum = await context.db.mutation.createAlbum(
          {
            data: {
              alias: album.alias,
              artists: {
                connect: mainArtists,
              },
              artwork: {
                create: {
                  url: album.artwork.url,
                  uploadedBy: {
                    connect: {
                      id: context.userId,
                    }
                  }
                }
              },
              duration: album.duration,
              name: album.name,
              numTracks: album.numTracks,
              releaseDate: album.releaseDate,
              releaseType: album.releaseType,
            },
          },
          info,
        );
      }
      // If album didn't exist and has been created...
      if (createdAlbum) {
        // ...create the track
        const dbTrack = await context.db.mutation.createTrack(
          {
            data: {
              album: {
                connect: {
                  id: createdAlbum.id,
                },
              },
              artists: {
                connect: mainArtists,
              },
              // Conditionally handle track with featured artist(s).
              ...(
                featuring &&
                {
                  featuring: {
                    connect: featuringArtists
                  }
                }
              ),
              duration,
              trackNumber,
              name,
            },
          },
          `{
            name
            artists { name }
            featuring { name }
            album { name }
            genre
          }`,
        );

        const index = context.algolia.initIndex('tracks');
        index.addObject({
          objectID: dbTrack.id,
          object: dbTrack,
        }, (err) => {
          if (err) {
            throw new UnknownError({
              message: err.message,
            })
          }
        });

        context.pubsub.publish('TRACK_CREATED', {
          trackCreated: dbTrack,
        });

        return dbTrack;
      }
    }

    return new TrackExistsError({
      data: {
        'name': name,
        'album': album,
      }
    });
  }

  /**
   * Updates a track
   * @param input
   * @param context
   * @param info
   */
  public async update(input, context: Context, info) {
    // TODO: Sanitize input from frontend
    const { artists, duration, featuring, id, name, trackNumber } = input;
    const trackExists = await context.db.exists.Track({ id });

    if (!trackExists) {
      throw new NodeNotFoundError({
        message: `Track:id:${id} could not be found`
      });
    }

    // Check mainArtists and featuringArtists currently in db for given track.
    const { artists: currentArtists, featuring: currentFeaturing } = await context.db.query.track({
      where: {
        id,
      }
    },
    `{
      artists {
        id
        alias
      }
      featuring {
        id
        alias
      }
    }`);
    // Find values that are in EXISTING_ARTISTS but not in artists
    const EXISTING_ARTISTS = currentArtists.filter((obj) =>
      !artists.some((obj2) => obj.alias === obj2.alias)
    );
    // Find values that are in EXISTING_FEATURED_ARTISTS but not in artists
    const EXISTING_FEATURED_ARTISTS = currentFeaturing.filter((obj) =>
      !featuring.some((obj2) => obj.alias === obj2.alias)
    );
    // Get artists that no longer exist in user input (to disconnect)
    const artistsToDisconnect = EXISTING_ARTISTS.map((artist) => {
      const object = { id: artist.id };

      return object;
    });
    // Get featured artists that no longer exist in user input (to disconnect)
    const featuringArtistsToDisconnect = EXISTING_FEATURED_ARTISTS.map((artist) => {
      const object = { id: artist.id };

      return object;
    });

    const mainArtists = await this.artistFactory(artists, context);
    const featuringArtists = await this.artistFactory(featuring, context);

    const dbTrack = await context.db.mutation.updateTrack(
      {
        data: {
          ...(
            mainArtists && {
              artists: {
                connect: mainArtists,
                ...(artistsToDisconnect.length > 0 && {
                  disconnect: artistsToDisconnect,
                })
              }
            }
          ),
          duration,
          ...(
            featuringArtists && {
              featuring: {
                connect: featuringArtists,
                ...(featuringArtistsToDisconnect.length > 0 && {
                  disconnect: featuringArtistsToDisconnect,
                })
              }
            }
          ),
          name,
          trackNumber
        },
        where: { id },
      },
      info,
    );

    const index = context.algolia.initIndex('tracks');
    index.saveObject({
      objectID: id,
      object: dbTrack,
    }, (err) => {
      if (err) {
        throw new UnknownError({
          message: err.message,
        })
      }
    });

    context.pubsub.publish('TRACK_UPDATED', {
      trackUpdated: dbTrack,
    });

    return dbTrack;
  }

  /**
   * Deletes a track
   * @param id
   * @param context
   */
  public async delete(id, context: Context) {
    const trackExists = await context.db.exists.Track({ id });

    if (!trackExists) {
      throw new NodeNotFoundError({
        message: `Track:id:${id} could not be found.`
      });
    }

    const dbTrack = await context.db.mutation.deleteTrack({ where: { id } });

    const index = context.algolia.initIndex('tracks');
    index.deleteObject(id, (err) => {
      if (err) {
        throw new UnknownError({
          message: err.message,
        })
      }
    });

    context.pubsub.publish('TRACK_DELETED', {
      trackDeleted: { id: dbTrack.id, name: dbTrack.name },
    });

    return dbTrack;
  }

  /**
   * Returns a track
   * @param id
   * @param context
   * @param info
   */
  public findOne(id, context: Context, info) {
    return context.db.query.track({ where: { id } }, info);
  }

  /**
   * Returns a collection of tracks
   * @param input
   * @param context
   * @param info
   */
  public findMany(input, context: Context, info) {
    const { first, last, after, before } = input;
    return context.db.query.tracksConnection(
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
    if (!artists) {
      return;
    }

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
   * Checks if a track exists in the database
   * @param input
   * @param context
   */
  private async trackExists(input, context) {
    const { album, name } = input;

    const getTracks: { tracks: Array<{ name: string }> } = await context.db.query.album({
      where: { alias: album.alias }
    }, `{ tracks { name } }`);

    if (getTracks) {
      const trackExists = Array.from(getTracks.tracks).findIndex((track) =>
        track.name.toLowerCase() === name.toLowerCase()
      ) !== -1;

      return trackExists;
    }

    return false;
  }
}
