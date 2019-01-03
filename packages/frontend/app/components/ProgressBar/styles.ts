import styled from 'styled-components';

const Wrapper = styled.div`
align-items: center;
  display: flex;
  height: 40px;
  left: 0;
  margin: 0 auto;
  position: absolute;
  right: 0;
  top: -40px;
  width: 100%;

  progress[value],
  input[type='range'] {
    appearance: none;
    width: 100%;
  }

  progress[value] {
    height: 3px;
    z-index: 0;

    &::-webkit-progress-bar,
    &::-webkit-progress-value {
      border-radius: 24px;
      height: 3px;
    }

    &::-webkit-progress-bar {
      background-color: #EEEEEE;
    }

    &::-webkit-progress-value {
      background-color: #000000;
    }
  }

  input[type='range'] {
    background-color: transparent;
    height: 40px;
    left: 0;
    position: absolute;
    top: 0;
    z-index: 1;

    &::-webkit-slider-thumb {
      appearance: none;
      background: #ffffff;
      border: thin solid #000000;
      height: 16px;
      width: 16px;
      border-radius: 48px;
      cursor: pointer;
    }
  }

  @media screen and (min-width: 768px) {
    input[type='range'] {
      &::-webkit-slider-thumb {
        display: block;
      }
    }
  }
`;

export default Wrapper;
