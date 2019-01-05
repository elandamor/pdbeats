import React, { SFC } from 'react';
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

const Header: SFC<IProps> = ({ className }) => (
  <Wrapper className={classNames('', className)} />
);

export default Header;
