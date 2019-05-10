import styled from 'styled-components';
import { fontSize } from 'styled-system';

interface ILabelProps {
  fontSize?: number;
}
/**
 * @render react
 * @name Label component
 * @description Label component.
 * @example
 *  <Label />
 */

const Label = styled.span<ILabelProps>`
  ${fontSize};
`;

export default Label;
