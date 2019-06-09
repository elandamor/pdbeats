import React, { FC } from 'react';
import classNames from 'classnames';
import { StyledSystemProps } from 'styled-system';
// Styles
import Wrapper from './styles';
import Inner from '../Inner';
import Flex from '../Flex';

// import { makeDebugger } from '../../utils';
// const debug = makeDebugger('Header');

interface IHeaderProps extends StyledSystemProps {
  className?: string;
};

/**
 * @render react
 * @name Header component
 * @description Header component.
 * @example
 * <Header />
 */

const Header: FC<IHeaderProps> = ({ className, ...rest }) => {
  return (
    <Wrapper className={classNames('', className)} as="header" {...rest}>
      <Inner as={Flex} />
    </Wrapper>
  );
}

Header.defaultProps = {
  height: [64,88],
}

export default Header;
