import React, { FC, useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';
import { useDropzone } from 'react-dropzone';
import { Image } from 'react-feather';
// Styles
import Wrapper, { Preview } from './styles';

import { makeDebugger } from '../../utils';

const debug = makeDebugger('Dropzone');

interface IFile extends File {
  preview: string;
}

interface IProps {
  className?: string;
  [key: string]: any;
};

/**
 * @render react
 * @name Dropzone component
 * @description Dropzone component.
 * @example
 * <Dropzone />
 */

const Dropzone: FC<IProps> = ({ className, ...rest }) => {
  const [files, setFiles] = useState([]);
  const accept = rest.accept || 'image/*';
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles.map((file: IFile) => Object.assign(file, {
      preview: URL.createObjectURL(file),
    })));
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept, onDrop
  });

  const preview = files.map((file: IFile) => (
    <Preview key={file.name} src={file.preview} />
  ))

  useEffect(() => {
    if (rest.form) {
      const { setFieldValue } = rest.form;
      setFieldValue(rest.name, files);
    }
    return () => {
      files.forEach((file: IFile) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Wrapper
      className={classNames('c-dropzone', className)}
      id={rest.id} name={rest.name}
      {...getRootProps({ refKey: 'ref' })}
    >
      {preview}
      <input id={rest.id} name={rest.name} {...getInputProps()} />
      <Image />
    </Wrapper>
  );
};

export default Dropzone;
