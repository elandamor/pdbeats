import styled from 'styled-components';

const Wrapper = styled.div`
  align-items: center;
  background: ${(props) => props.theme.palette.cardBackground};
  bottom: 0;
  display: flex;
  left: 0;
  min-height: 56px;
  position: fixed;
  width: 100%;
  z-index: 10;
`;

export default Wrapper;
