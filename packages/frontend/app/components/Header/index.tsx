import React, { FC } from 'react';
import classNames from 'classnames';
// Styles
import Wrapper from './styles';

/**
 * @render react
 * @name Header component
 * @description Header component.
 * @example
 * <Header />
 */

interface IProps {
  className?: string;
};

const Header: FC<IProps> = ({ className }) => (
  <Wrapper className={classNames('c-header', className)} />
);

export default Header;
