import styled from 'styled-components';

const Wrapper = styled.div`
  [href] {
    color: #000000;
    text-decoration: none;
  }

  .c-artist {
    align-items: center;
    display: flex;
    padding: 12px;
  }

  .c-avatar__wrapper {
    background-color: ${(props) => props.theme.palette.cardBorderColor};
    border-radius: 100%;
    height: 40px;
    margin-right: 20px;
    width: 40px;
  }
`;

export default Wrapper;
