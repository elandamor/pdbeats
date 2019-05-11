import styled from "styled-components";
import { ITheme, THEME } from "../../global-styles";

/**
 * @render react
 * @name H5 component
 * @description Heading level 5.
 * @example
 *  <H5>Heading</H5>
 */

const H5 = styled.h5`
  color: ${({ color, theme }) => color || theme.colors.textColorDark};
  font-size: ${({ theme }: ITheme) => theme.fontSizes[5]}px;
  font-weight: ${THEME.fontWeights[3]};
  letter-spacing: ${THEME.letterSpacings[2]}rem;
`;

export default H5;