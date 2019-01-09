import styled from 'styled-components';

const Wrapper = styled.div`
  .c-banner {
    align-items: flex-end;
    background-color: ${(props) => props.theme.palette.cardBorderColor};
    display: flex;
    height: calc(100vw / (16/10));
    padding: 12px

    h2 {
      color: #ffffff;
      margin: 0;
      padding: 0;
    }
  }
`;

export default Wrapper;
