import styled from 'styled-components';

const Wrapper = styled.div`
  color: #555;
  font-size: 14px;
  padding: 8px 0;

  &.-current {
    border: 2px solid red;
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
