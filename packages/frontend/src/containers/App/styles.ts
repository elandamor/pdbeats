import styled from 'styled-components';
import theme from '../../theme';
import { space, StyledSystemProps, position } from 'styled-system';
import Sidebar from 'components/Sidebar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .c-player {
    display: none;
  }

  @media screen and (min-width: 1024px) {
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

export const SideNav = styled(Sidebar)<StyledSystemProps>`
  ${position};
`;

SideNav.defaultProps = {
  position: ['fixed', null, 'relative'],
};

export const Pages = styled.div<StyledSystemProps>`
  flex-basis: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
  position: relative;

  ${space};
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
