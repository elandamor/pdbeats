import styled from 'styled-components';

const Wrapper = styled.div`
  .c-btn--create {
    align-items: center;
    background-color: transparent;
    color: ${(props) => props.theme.colors.cardBorderColor};
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
  }
`;

export default Wrapper;
