import styled from 'styled-components';
import theme from '../../theme';

const Wrapper = styled.div`
  align-items: center;
  background: rgba(255,255,255,.875);
  backdrop-filter: blur(5px);
  display: flex;
  min-height: 80px;
  position: relative;
  width: 100%;

  .c-progressBar {
    left: 0;
    position: absolute;
    top: -21px;
  }

  .c-btn.-prev,
  .c-btn--mute,
  .c-volumeBar,
  .a-time {
    display: none;
  }

  .c-nowPlaying {
    flex-basis: 100%;
    overflow: hidden;

    .c-details {
      .a-name {
        font-size: ${theme.fontSizes[3]}px;
      }

      .c-artists {
        font-size: ${theme.fontSizes[2]}px;
        margin-bottom: ${theme.space[1]}px;
      }
    }
  }

  .c-btn--mute {
    display: none;
    height: 40px;
    width: 40px;
  }

  @media screen and (min-width: 1024px) {
    .c-volumeBar {
      display: flex;
      margin-left: 8px;
    }

    .c-btn.-prev {
      display: inline-block;
    }
  }
`;

export default Wrapper;
