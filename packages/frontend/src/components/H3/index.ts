import styled, { css } from "styled-components";
import { THEME } from "../../global-styles";
import { space } from 'styled-system';

/**
 * @render react
 * @name H3 component
 * @description Heading level 3.
 * @example
 *  <H3>Heading</H3>
 */

const H3 = styled.h3`
  ${space};
  color: ${({ color, theme }) => color || theme.colors.textColorDark};
  font-size: ${({ theme }: ITheme) => theme.fontSizes[7]}px;
  font-weight: ${THEME.fontWeights[3]};
  letter-spacing: ${THEME.letterSpacings[2]}rem;
`;

export default H3;