import styled from 'styled-components';
import Button from '../Button';
import { THEME } from '../../global-styles';

const Wrapper = styled(Button)`
  position: sticky;
  top: 0;
  transform: translateX(-88px);
  background-color: ${THEME.colors.sidebarBackground};
  border-radius: 100%;
  height: 56px;
  margin-bottom: -56px;
  overflow: hidden;
  width: 56px;

  i, i > svg {
    height: 24px;
    width: 24px;
  }
`;

export default Wrapper;
