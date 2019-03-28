import styled from 'styled-components';
import { THEME } from '../../global-styles';
import Flex from '../Flex';

const Wrapper = styled.div`
  img {
    background-color: ${(props) => props.theme.colors.sidebarBackground};
    border-radius: 4px;
    flex: none;
    text-indent: -99999px;
  }

  header {
    align-items: flex-start;
    border-bottom: thin solid ${(props) => props.theme.colors.cardBorderColor};
    display: flex;
    justify-content: space-between;
  }

  .c-equalizer {
    background-color: transparent;
  }
`;

export const Details = styled.div`
  h4, h6 {
    /* letter-spacing: ${THEME.letterSpacings[3]}rem; */
    line-height: 1;
    margin: 0;
  }

  /* h4 {
    font-weight: 800;
  } */

  h6 {
    font-size: ${THEME.fontSizes[3]}px;
    margin: 8px 0;

    span:first-child {
      color: ${THEME.colors.blacks[7]};
      display: none;
      font-weight: 400;
    }
  }
`;

export const Metadata = styled.div`
  opacity: 0;
`;

export const Actions = styled(Flex)`
  .c-btn {
    border-radius: 100%;
    height: 56px;
    overflow: hidden;
    width: 56px;
  }

  .c-btn--play,
  .c-btn--edit {
    i {
      margin-left: 1px;
    }
  }

  .c-btn--edit {
    background-color: ${THEME.colors.sidebarBackground};
    position: absolute;
    transform: translateX(32px);
  }
`;

export const Tracks = styled.ul`
  margin: 0;
  padding: 0;

  .c-track {
    padding: 8px 0;
  }
`;

export default Wrapper;
