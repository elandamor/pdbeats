import styled from 'styled-components';
import { maxWidth, minWidth } from 'styled-system';

export interface IProps {
  align?: string;
  className?: string;
  direction?: 'column' | 'row';
  justify?: string;
  marginRight?: number;
  size?: number | 'none';
  maxWidth?: number;
  minWidth?: number;
  width?: string;
}

/**
 * @render react
 * @name Flex component
 * @description Flex component.
 * @example
 *  <Flex />
 */

const Flex = styled.div<IProps>`
  ${maxWidth};
  ${minWidth};
  align-items: ${({ align }) => align || 'stretch'};
  display: flex;
  flex: ${({ size }) => size || '1'};
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  margin-right: ${({ marginRight }) => marginRight || '0'}px;
  width: ${({ width }) => width || 'auto'};
`;

export default Flex;
