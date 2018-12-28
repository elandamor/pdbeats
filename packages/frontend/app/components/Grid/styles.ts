import styled, { StyledFunction } from 'styled-components';
import { Props } from '.';

const div: StyledFunction<Props & React.HTMLProps<HTMLInputElement>> = styled.div

const Wrapper = div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  grid-gap: ${(props) => props.gap ? props.gap + 'px' : '24px'};
`;

export default Wrapper;
