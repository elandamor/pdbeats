import React, { SFC } from 'react';
import classNames from 'classnames';
// Styles
import Wrapper, { Bar1, Bar2 } from './styles';

/**
 * @render react
 * @name Equalizer component
 * @description Equalizer component.
 * @example
 * <Equalizer />
 */

interface IProps {
  className?: string;
  isLoading?: boolean;
}

const Equalizer: SFC<IProps> = ({ className }) => (
  <Wrapper
    className={classNames('c-equalizer', className)}
  >
    <Bar1 />
    <Bar2 />
  </Wrapper>
);

export default Equalizer;
