import styled from 'styled-components';
import { THEME } from '../../global-styles';

const Wrapper = styled.div`
  --banner-height: calc(30vw / (16 / 9));

  align-items: flex-end;
  display: flex;
  height: var(--banner-height);
  padding: 12px;

  &:before {
    background-color: ${THEME.colors.cardBorderColor};
    content: '';
    height: calc(var(--banner-height) + 80px);
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 0;
  }
`;

export const Content = styled.div`
  opacity: 0;
  z-index: 1;
`;

export default Wrapper;
