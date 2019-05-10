import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { RouteComponentProps } from 'react-router-dom';
import arrayMove from 'array-move';
import moment from 'moment';
// Styles
import Wrapper, { EditableTrack, TrackForm, Tracks } from './styles';
import { Button, Card, Flex, Form, Input, Spacer, Track, GoBackButton, Label } from '../../components';
import { useFormInput } from '../../hooks';

import { makeDebugger, formatArtists } from '../../utils';
import { PlusCircle, XCircle } from 'react-feather';
import releaseTypes from '../../data/releaseTypes';
import genres from '../../data/genres';
import { Mutation } from 'react-apollo';
import addAlbumGQL from '../../graphql/mutations/addAlbum.gql';
import getAlbumsGQL from '../../graphql/queries/getAlbums.gql';
import { DATE_FORMAT } from '../../constants';

const debug = makeDebugger('EditAlbum');

interface IProps extends RouteComponentProps {
  className?: string;
};

/**
 * @render react
 * @name EditAlbum component
 * @description EditAlbum component.
 * @example
 * <EditAlbum />
 */

const EditAlbum: FC<IProps> = ({ className, history }) => {
  const [tracks, setTracks] = useState([]);
  const albumName = useFormInput('');
  const albumArtists = useFormInput('');
  const albumGenres = useFormInput({});
  const albumDescription = useFormInput('');
  const artwork = useFormInput('');
  const releaseDate = useFormInput('');
  const releaseType = useFormInput({});
  const trackArtists = useFormInput('');
  const trackFeaturing = useFormInput('');
  const trackName = useFormInput('');

  const addTrack = () => {
    const artists = trackArtists.value.split(',').map((artist: any) => (
      {
        alias: artist.toLowerCase().trim().replace(/\s/, '-'),
        name: artist.trim(),
      }
    ));

    const featuring = trackFeaturing.value
      ? trackFeaturing.value.split(',').map((artist: any) => (
        {
          alias: artist.toLowerCase().trim().replace(/\s/, '-'),
          name: artist.trim(),
        }
      ))
      : [];

    const track = {
      artists,
      ...(featuring.length > 0 && {
        featuring,
      }),
      name: trackName.value,
      duration: '00:00',
    };

    // @ts-ignore
    setTracks([
      ...tracks,
      track
    ]);
  };

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
            const cleanAlbumName = albumName.value.toLowerCase().trim().replace(/\s/, '-');
            const cleanArtists = formatArtists(albumArtists.value, true).join('-');

            const payload = {
              alias: cleanArtists + '-' + cleanAlbumName,
              artwork: {
                url: artwork.value,
              },
              name: albumName.value,
              artists: formatArtists(albumArtists.value),
              genres: albumGenres.value.value.split(',').map((genre: any) => {
                return genre.trim();
              }),
              releaseDate: releaseDate.value,
              releaseType: releaseType.value.value,
              tracks: tracks.map((track: any, index: number) => (
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

                  const exists = Boolean(previousAlbums.find((album: any) =>
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
              debug({ albumId });
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
                  type="file"
                  sronly
                  {...artwork}
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
                disabled={loading}
                text={loading ? 'Creating...' : 'Create'}
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

const SortableItem = SortableElement(({ index, value }: any) => {
  const data = {
    ...value,
    trackNumber: ++index,
  }

  return (
    <EditableTrack>
      <Track data={data} />
      <Button iconOnly icon={<XCircle />} />
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

export default EditAlbum;
