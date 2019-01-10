import styled from 'styled-components';

const Wrapper = styled.div`
  align-items: center;
  display: flex;

  * {
    outline: none;
  }

  .c-btn {
    height: 40px;
    width: 40px;

    &.-next {
      margin-right: 8px;
    }
  }
`;

export default Wrapper;
