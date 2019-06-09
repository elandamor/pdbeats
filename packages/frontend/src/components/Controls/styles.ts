import styled from 'styled-components';
import { borders, color, size, space, StyledSystemProps } from 'styled-system';
import Button from 'components/Button';

export const PlayPauseButton = styled(Button)<StyledSystemProps>`
  ${borders};
  ${color};
  ${size};
  ${space};

  &.-play i {
    margin-left: 1px;
  }
`;
