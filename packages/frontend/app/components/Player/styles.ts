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

    .a-duration,
    .a-trackNumber {
      display: none;
    }
  }
`;

export default Wrapper;
