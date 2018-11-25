import React, { SFC } from 'react';
import classNames from 'classnames';
// Styles
import Wrapper from './styles';

/**
 * @render react
 * @name LoadingBar component
 * @description LoadingBar component.
 * @example
 * <LoadingBar />
 */

interface IProps {
  className?: string;
  isLoading?: boolean;
}

const LoadingBar: SFC<IProps> = ({ className, isLoading }) => (
  <Wrapper
    className={classNames('c-loadingBar', className, {
      '-loading': isLoading,
    })}
  />
);

export default LoadingBar;
