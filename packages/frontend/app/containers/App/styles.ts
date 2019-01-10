import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

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
  flex-basis: 100%;
  overflow-y: scroll;
  overscroll-behavior: contain;
  padding-bottom: 56px;
`;

export const BottomSheet = styled.div`
  border-top: thin solid ${({ theme }) => theme.palette.cardBorderColor};
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
