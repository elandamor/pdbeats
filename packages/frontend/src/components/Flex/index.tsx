import styled from 'styled-components';
import { alignItems, display, flexDirection, justifyContent, maxWidth, minWidth, space, StyledSystemProps, width } from 'styled-system';

export interface IProps extends StyledSystemProps {
  size?: number | 'none';
}

/**
 * @render react
 * @name Flex component
 * @description Flex component.
 * @example
 *  <Flex />
 */

const Flex = styled.div<IProps>`
  ${alignItems};
  ${display};
  ${flexDirection};
  ${justifyContent};
  ${space};
  ${maxWidth};
  ${minWidth};
  ${width};
  flex: ${({ size }) => size};
`;

Flex.defaultProps = {
  alignItems: 'stretch',
  display: 'flex',
  flexDirection: 'row',
  size: 1,
};

export default Flex;
