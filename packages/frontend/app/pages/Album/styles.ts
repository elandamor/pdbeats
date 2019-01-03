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

  .c-album {
    margin: 12px 0 24px;

    header {
      align-items: center;
      display: flex;
      margin-bottom: 8px;

      img {
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
  }

  .c-track,
  .c-tracks {
    li {
      list-style-type: none;
    }
  }

  .c-tracks {
    margin: 0;
    padding: 0;

    li {
      align-items: center;
      display: flex;
    }
  }

  .c-track {
    color: #555;
    font-size: 14px;
    padding: 8px 0;

    .a-trackNumber,
    .a-duration {
      flex: none;
      font-size: 13px;
    }

    .a-trackNumber {
      padding: 0 12px;
      text-align: left;
      width: 40px;
    }

    .c-details {
      flex-basis: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }

    .a-name {
      color: #000;
      font-size: 14px;
    }

    .c-artists {
      font-size: 12px;
      margin-top: 8px;
    }

    .a-artist {
      display: inline;
      pointer-events: none;
    }

    .a-duration {
      padding: 0 12px;
    }
  }
`;

export default Wrapper;
