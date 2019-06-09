import styled from 'styled-components';
import { color, height } from 'styled-system';
import Flex from '../Flex';

const Wrapper = styled(Flex)`
  position: sticky;
  top: 0;
  z-index: 5;

  ${color};
  ${height};
`;

export default Wrapper;
