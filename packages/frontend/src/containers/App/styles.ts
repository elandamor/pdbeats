import styled from 'styled-components';
import { THEME } from '../../global-styles';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  grid-template-areas: "sidebar pages";
  height: 100vh;
  overflow: hidden;

  .c-sidebar {
    background-color: ${({ theme }) => theme.colors.sidebarBackground};
    grid-area: sidebar;
  }

  .c-header {
    grid-area: header;
  }

  .c-pages {
    grid-area: pages;
  }

  .c-player {
    bottom: 56px;
    position: absolute;
    z-index: 4;
  }

  @media screen and (min-width: 1024px) {
    .c-player {
      bottom: 0;
    }
  }
`;

export const Pages = styled.div`
  box-shadow: 0 -6px 10px 10px ${THEME.colors.blacks[1]};
  flex-basis: 100%;
  overflow-y: scroll;
  overscroll-behavior: contain;
  padding: 80px;
  position: relative;
`;

export const BottomSheet = styled.div`
  border-top: thin solid ${({ theme }) => theme.colors.cardBorderColor};
  height: 56px;
  position: relative;

  .c-nav {
    ul {
      align-items: center;
      display: flex;
      height: 56px;
      justify-content: space-around;
      margin: 0;
      padding: 0;
    }
  }
`;

export default Wrapper;
