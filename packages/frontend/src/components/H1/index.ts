import styled from "styled-components";
import { ITheme, THEME } from "../../global-styles";

/**
 * @render react
 * @name H1 component
 * @description Heading level 1.
 * @example
 *  <H1>Heading</H1>
 */

const H1 = styled.h1`
  color: ${({ color, theme }) => color || theme.colors.textColorDark};
  font-size: ${({ theme }: ITheme) => theme.fontSizes[9]}px;
  font-weight: ${THEME.fontWeights[2]};
  /* letter-spacing: ${THEME.letterSpacings[0]}rem; */
`;

export default H1;
