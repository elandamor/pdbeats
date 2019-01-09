import styled from 'styled-components';

const Wrapper = styled.li`
  align-items: center;
  color: #555;
  display: flex;
  font-size: 14px;
  list-style-type: none;
  padding: 6px 12px;
  position: relative;

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

  .c-cover__wrapper {
    background-color: ${(props) => props.theme.palette.cardBorderColor};
    border-radius: 3px;
    flex: none;
    height: 40px;
    margin-right: 12px;
    overflow: hidden;
    transition: transform .195s ease-out;
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

  &.-current {
    background-color: rgba(0,0,0,.125);

    .c-cover__wrapper {
      transform: scale(0.9);
    }
  }
`;

export default Wrapper;
