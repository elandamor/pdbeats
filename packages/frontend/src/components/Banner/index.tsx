import React, { FC } from 'react';
import classNames from 'classnames';
// Styles
import Wrapper, { Content } from './styles';

// import { makeDebugger } from '../../utils';
// const debug = makeDebugger('Banner');

interface IProps {
  children?: any;
  className?: string;
};

/**
 * @render react
 * @name Banner component
 * @description Banner component.
 * @example
 * <Banner />
 */

const Banner: FC<IProps> = ({ children, className }) => (
  <Wrapper className={classNames('c-banner', className)}>
    <Content>{children}</Content>
  </Wrapper>
);

export default Banner;
