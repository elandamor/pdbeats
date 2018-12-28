import styled from 'styled-components';

const Wrapper = styled.div`
  .read-more-state {
    display: none;
  }

  .read-more-target {
    opacity: 0;
    max-height: 0;
    font-size: 0;
  }

  .read-more-state:checked ~ .read-more-wrap:first-child .read-more-target {
    opacity: 1;
    font-size: inherit;
    max-height: 999em;
  }

  .read-more-state ~ .read-more-trigger:before {
    content: 'Show more';
  }

  .read-more-state:checked ~ .read-more-trigger:before {
    display: none;
  }

  .read-more-trigger {
    cursor: pointer;
    display: inline-block;
    padding: 0 .5em;
    color: #666;
    font-size: .9em;
    line-height: 2;
    border: 1px solid #ddd;
    border-radius: .25em;
  }
`;

export default Wrapper;
