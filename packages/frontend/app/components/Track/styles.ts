import styled from 'styled-components';

const Wrapper = styled.div`
  align-items: center;
  color: #555;
  display: flex;
  font-size: 14px;
  padding: 6px 12px;

  &.-current {
    background-color: rgba(0,0,0,.04);
  }

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
`;

export default Wrapper;
