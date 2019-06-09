import styled from 'styled-components';
import theme from '../../theme';
import Flex from 'components/Flex';

const Wrapper = styled(Flex)`
  background: rgba(255,255,255,.875);
  backdrop-filter: blur(5px);
  min-height: 80px;
  position: relative;
  width: 100%;

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
`;

export default Wrapper;
