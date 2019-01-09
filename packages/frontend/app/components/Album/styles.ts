import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 12px 0 24px;

  header {
    align-items: center;
    display: flex;
    margin-bottom: 8px;

    img {
      border-radius: 3px;
      flex: none;
      margin: 0 12px;
    }

    h3, h4 {
      font-size: 20px;
      font-weight: 600;
      margin: 0;
    }

    h4 {
      font-weight: 500;
      margin-bottom: 4px;
    }

    [href] {
      color: blue;
      text-decoration: none;
    }

    .c-details {
      font-size: 15px;
    }

    .a-releaseDate,
    span {
      color: #555;
    }
  }

  .c-equalizer {
    background-color: hsl(0, 0%, 88%);
  }
`;

export const Tracks = styled.ul`
  margin: 0;
  padding: 0;

  .c-track {
    padding: 8px 0;
  }
`;

export default Wrapper;
