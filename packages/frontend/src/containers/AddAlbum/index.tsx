import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, Form, Field, FieldProps } from 'formik';
// Styles
import Wrapper from './styles';
import { GoBackButton, Spacer, Flex, Input } from '../../components';

import { makeDebugger } from '../../utils';
import genres from 'data/genres';
import releaseTypes from 'data/releaseTypes';
import handleUpload from 'utils/uploader';

const debug = makeDebugger('AddAlbum');

interface IProps extends RouteComponentProps {
  className?: string;
};

interface AlbumFormValues {
  artwork?: [];
};

const INITIAL_VALUES: AlbumFormValues = {
  artwork: [],
};

/**
 * @render react
 * @name AddAlbum component
 * @description AddAlbum component.
 * @example
 * <AddAlbum />
 */

const AddAlbum: FC<IProps> = ({ className }) => (
  <Wrapper className={classNames('', className)}>
    <Helmet title="Create a new album" />
    <GoBackButton />
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={async (values, actions) => {
        if (values.artwork && values.artwork.length > 0) {
          const res = await handleUpload(values.artwork, 'covers');
          debug({res})
        }
        debug({ actions, values });
      }}
      render={(formikProps) => (
        <Form>
          <Flex>
            <Flex mr={5} size={1}>
              <Field
                name="artwork"
                render={({ field }: FieldProps<AlbumFormValues>) => (
                  <Input
                    {...field}
                    field={field}
                    form={formikProps}
                    label="Artwork"
                    type="file"
                    sronly
                  />
                )}
              />
            </Flex>
            <Flex flexDirection="column" size={2}>
              <Field
                name="name"
                render={({ field }: FieldProps<AlbumFormValues>) => (
                  <Input
                    {...field}
                    field={field}
                    form={formikProps}
                    label="Name"
                    type="text"
                  />
                )}
              />
              <Field
                name="artists"
                render={({ field }: FieldProps<AlbumFormValues>) => (
                  <Input
                    {...field}
                    field={field}
                    form={formikProps}
                    label="Artist(s)"
                    type="text"
                  />
                )}
              />
              <Flex>
                <Field
                  name="releaseType"
                  render={({ field }: FieldProps<AlbumFormValues>) => (
                    <Input
                      {...field}
                      field={field}
                      form={formikProps}
                      label="Release Type"
                      type="select"
                      options={releaseTypes}
                      mr={3}
                    />
                  )}
                />
                <Field
                  name="releaseDate"
                  render={({ field }: FieldProps<AlbumFormValues>) => (
                    <Input
                      {...field}
                      field={field}
                      form={formikProps}
                      label="Release Date"
                      type="date"
                    />
                  )}
                />
              </Flex>
              <Field
                name="genres"
                render={({ field }: FieldProps<AlbumFormValues>) => (
                  <Input
                    {...field}
                    field={field}
                    form={formikProps}
                    label="Genre(s)"
                    type="select"
                    options={genres}
                  />
                )}
              />
              <Field
                name="description"
                render={({ field }: FieldProps<AlbumFormValues>) => (
                  <Input
                    {...field}
                    field={field}
                    form={formikProps}
                    label="Description"
                    type="textarea"
                    rows={8}
                  />
                )}
              />
            </Flex>
          </Flex>
          <button type="submit">Create</button>
          <pre>{JSON.stringify(formikProps, null, 2)}</pre>
        </Form>
      )}
    />
    <Spacer spacing={40} />
  </Wrapper>
);

export default AddAlbum;
