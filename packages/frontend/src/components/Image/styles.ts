import styled, { keyframes } from 'styled-components';
import { height, width } from 'styled-system';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBorderColor};
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;

  ${height};
  ${width};

  img {
    left: 0;
    position: absolute;
    top: 0;
    visibility: hidden;
    width: 100%;
  }

  .lazy-image-loaded {
    animation-duration: 3s;
    animation-name: ${fadeIn};
    visibility: visible;
  }
`;

Wrapper.defaultProps = {
  height: 0,
}

export default Wrapper;
