import styled from 'styled-components';

const Wrapper = styled.div`
  [href] {
    color: #000000;
    text-decoration: none;
  }

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

  .c-grid {
    padding: 12px;
  }

  .c-album {
    margin: 0;

    img {
      border-radius: 4px;
      height: auto;
      width: 100%;
    }

    .c-details {
      font-size: 13px;

      h4 {
        margin: 8px 0 0;
      }

      small {
        color: #555;
      }
    }
  }
`;

export default Wrapper;
