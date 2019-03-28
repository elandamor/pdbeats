import styled from 'styled-components';

const Wrapper = styled.div`
  .c-tracks {
    margin: 0;
    padding: 0;
  }

  .c-track {
    align-items: center;
    color: #555;
    display: flex;
    font-size: 14px;
    padding: 6px 12px;

    .c-cover__wrapper {
      background-color: ${(props) => props.theme.colors.cardBorderColor};
      height: 40px;
      margin-right: 12px;
      width: 40px;
    }

    img {
      flex: none;
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
