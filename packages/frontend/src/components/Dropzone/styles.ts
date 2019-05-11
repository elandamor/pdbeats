import styled from 'styled-components';
import { THEME } from '../../global-styles';

const Wrapper = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.sidebarBackground};
  border: thin solid ${(props) => props.theme.colors.cardBorderColor};
  border-radius: 4px;
  color: ${(props) => props.theme.colors.cardBorderColor};
  cursor: pointer;
  display: flex;
  height: 400px;
  justify-content: center;
  overflow: hidden;
  width: 400px;

  &:focus,
  &:hover {
    border: ${THEME.borders[1]} ${THEME.colors.primary};
    outline: none;
  }

  svg {
    height: 64px;
    pointer-events: none;
    position: absolute;
    width: 64px;
  }
`;

export const Preview = styled.img`
  height: auto;
  width: 100%;
`;

export default Wrapper;