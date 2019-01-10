import styled from 'styled-components';

const Wrapper = styled.div`
  align-items: center;
  background: rgba(255,255,255,.875);
  display: flex;
  min-height: 56px;
  position: relative;
  width: 100%;

  .c-progressBar {
    left: 0;
    position: absolute;
    top: -22px;
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

    .a-duration {
      display: none;
    }

    .c-details {
      .a-name {
        font-size: 16px;
      }
    }
  }

  .c-btn--mute {
    height: 40px;
    width: 40px;
  }

  @media screen and (min-width: 1024px) {
    .c-nowPlaying {
      flex: none;
      width: 240px;

      .c-details {
        .a-name {
          font-size: 14px;
        }
      }
    }

    .c-controls {
      flex-basis: 100%;
      justify-content: center;
    }

    .c-volumeBar {
      display: flex;
      margin-left: 8px;
    }

    .c-btn.-prev,
    .c-btn--mute {
      display: inline-block;
    }
  }
`;

export default Wrapper;
