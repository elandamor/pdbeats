import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { RouteComponentProps } from 'react-router-dom';
import arrayMove from 'array-move';
import moment from 'moment';
// Styles
import Wrapper, { EditableTrack, TrackForm, Tracks } from './styles';
import { Button, Flex, Form, GoBackButton, Input, Label, Spacer, Track } from '../../components';
import { useFormInput } from '../../hooks';

import { formatArtists, makeDebugger } from '../../utils';
import { PlusCircle, XCircle } from 'react-feather';
import releaseTypes from '../../data/releaseTypes';
import genres from '../../data/genres';
import { Mutation } from 'react-apollo';
import addAlbumGQL from '../../graphql/mutations/addAlbum.gql';
import getAlbumsGQL from '../../graphql/queries/getAlbums.gql';
import { DATE_FORMAT } from '../../constants';
import handleUpload from '../../utils/uploader';

const debug = makeDebugger('AddAlbum');

interface IProps extends RouteComponentProps {
  className?: string;
};

/**
 * @render react
 * @name AddAlbum component
 * @description AddAlbum component.
 * @example
 * <AddAlbum />
 */

const AddAlbum: FC<IProps> = ({ className, history }) => {
  const CURRENT_DATE = moment(new Date('2018-06-01')).format(DATE_FORMAT);
  const [artwork, setArtwork] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [uploading, setUploading] = useState(false);
  const albumName = useFormInput('Neon Future III');
  const albumArtists = useFormInput('Steve Aoki');
  const albumGenres = useFormInput({ label: 'Dance', value: 'Dance'});
  const albumDescription = useFormInput('');
  const releaseDate = useFormInput(CURRENT_DATE);
  const releaseType = useFormInput({ label: 'Album', value: 'ALBUM'});
  const trackArtists = useFormInput('');
  const trackFeaturing = useFormInput('');
  const trackName = useFormInput('');

  const addTrack = () => {
    const artists = formatArtists(trackArtists.value);
    const featuring = trackFeaturing.value
      ? formatArtists(trackFeaturing.value) : [];

    const track = {
      artists,
      ...(featuring.length > 0 && {
        featuring,
      }),
      name: trackName.value,
      duration: '00:00',
    };

    // @ts-ignore
    setTracks([...tracks, track]);

    // Reset inputs
    trackArtists.value = '';
    trackFeaturing.value = '';
    trackName.value = '';
  };

  const removeTrack = (trackToRemove: any) => {
    const filteredTracks = tracks.filter((track: any) => {
      return track.name !== trackToRemove.name;
    });

    setTracks(filteredTracks);
  };

  const SortableItem = SortableElement(({ index, value }: any) => {
    const data = { ...value, trackNumber: ++index };

    return (
      <EditableTrack key={`item-${index}`}>
        <Track data={data} />
        <Button
          iconOnly
          icon={<XCircle />}
          onClick={() => removeTrack(data)}
        />
      </EditableTrack>
    );
  });

  const SortableList = SortableContainer(({ items }: any) => (
    <Tracks>
      {items.map((item: any, index: number) => (
        <SortableItem key={`item-${index}`} index={index} value={item} />
      ))}
    </Tracks>
  ));

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    setTracks(arrayMove(tracks, oldIndex, newIndex));
  }

  return (
    <Wrapper className={classNames('c-albums', className)}>
      <Helmet title="Create a new album" />
      <GoBackButton />
      <Mutation mutation={addAlbumGQL}>
        {(createAlbum, { loading }) => (
          <Form onSubmit={async () => {
            const cleanAlbumName = albumName.value.toLowerCase().trim().replace(/\s/g, '-');
            const cleanArtists = formatArtists(albumArtists.value, true).join('-');

            let cover = {
              public_id: 'placeholder',
            };

            if (artwork.length > 0) {
              setUploading(true);
              // @ts-ignore
              [cover] = await handleUpload(artwork, 'covers');
              setUploading(false);
            }

            const payload = {
              alias: cleanArtists + '-' + cleanAlbumName,
              artwork: {
                url: cover.public_id,
              },
              name: albumName.value,
              artists: formatArtists(albumArtists.value),
              genres: albumGenres.value.value.split(',').map((genre: any) => {
                return genre.trim();
              }),
              releaseDate: releaseDate.value,
              releaseType: releaseType.value.value,
              tracks: tracks.map((track, index) => (
                Object.assign({},
                  track,
                  { trackNumber: ++index }
                )
              )),
            };

            try {
              const { id: albumId } = await createAlbum({
                variables: {
                  input: payload,
                },
                update: (store, { data: { album } }) => {
                  const data: any = store.readQuery({ query: getAlbumsGQL });

                  const previousAlbums = data.albums.edges;
                  const newAlbum = {
                    node: Object.assign({}, album),
                    __typename: 'AlbumEdge',
                  };

                  const exists = Boolean(previousAlbums.find((album) =>
                    newAlbum.node.id === album.node.id
                  ));

                  if (!exists) {
                    previousAlbums.concat(newAlbum);
                  }

                  store.writeQuery({
                    query: getAlbumsGQL,
                    data,
                  });
                },
              }).then(({ data }) => data.album);

              history.push(`/albums/${albumId}`);
            } catch(error) {
              debug(error);
            }
          }}>
            <Flex>
              <Flex marginRight={40} size={1}>
                <Input
                  id="artwork"
                  label="Artwork"
                  name="artwork"
                  onChange={(event: any) => setArtwork(event.target.files)}
                  type="file"
                  sronly
                />
              </Flex>
              <Flex direction="column" size={2}>
                <Input
                  id="albumName"
                  label="Name"
                  name="albumName"
                  type="text"
                  {...albumName}
                />
                <Input
                  id="albumArtists"
                  label="Artist(s)"
                  name="albumArtists"
                  type="text"
                  {...albumArtists}
                />
                <Flex>
                  <Flex marginRight={24}>
                    <Input
                      id="releaseType"
                      label="Release Type"
                      name="releaseType"
                      options={releaseTypes}
                      type="select"
                      {...releaseType}
                    />
                  </Flex>
                  <Flex>
                    <Input
                      id="releaseDate"
                      label="Release Date"
                      name="releaseDate"
                      type="date"
                      {...releaseDate}
                    />
                  </Flex>
                </Flex>
                <Flex>
                  <Flex marginRight={24} size={0.5}>
                    <Input
                      id="albumGenres"
                      label="Genre(s)"
                      name="albumGenres"
                      options={genres}
                      type="select"
                      {...albumGenres}
                    />
                  </Flex>
                </Flex>
                <Input
                  id="albumDescription"
                  label="Description"
                  name="albumDescription"
                  rows={8}
                  type="textarea"
                  {...albumDescription}
                />
                <Spacer spacing={8} />
                <Flex direction="column">
                  <Label fontSize={1}>Track(s)</Label>
                  <Spacer spacing={8} />
                  {
                    tracks.length > 0 && (
                      <React.Fragment>
                        <SortableList
                          items={tracks}
                          lockAxis="y"
                          onSortEnd={onSortEnd}
                        />
                        <Spacer spacing={8} />
                      </React.Fragment>
                    )
                  }
                </Flex>
                <TrackForm>
                  <Flex>
                    <Input
                      id="trackArtists"
                      label="Artist(s)"
                      name="trackArtists"
                      placeholder="Artist(s)"
                      type="text"
                      sronly
                      {...trackArtists}
                    />
                  </Flex>
                  <Flex>
                    <Input
                      id="trackFeaturing"
                      label="Featuring"
                      name="trackFeaturing"
                      placeholder="Featuring"
                      type="text"
                      sronly
                      {...trackFeaturing}
                    />
                  </Flex>
                  <Flex>
                    <Input
                      id="trackName"
                      label="Name"
                      name="trackName"
                      placeholder="Name"
                      type="text"
                      sronly
                      {...trackName}
                    />
                  </Flex>
                  {
                    trackArtists.value && trackName.value && (
                      <Flex size="none">
                        <Button
                          iconOnly
                          onClick={addTrack}
                          icon={<PlusCircle />}
                        />
                      </Flex>
                    )
                  }
                </TrackForm>
              </Flex>
            </Flex>
            <Spacer spacing={24} />
            <Flex justify="flex-end">
              <Button
                raised
                disabled={loading || uploading}
                text={loading || uploading ? 'Creating...' : 'Create'}
                type="submit"
              />
            </Flex>
          </Form>
        )}
      </Mutation>
      <Spacer spacing={40} />
    </Wrapper>
  );
};

export default AddAlbum;
