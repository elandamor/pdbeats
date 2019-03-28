import styled from 'styled-components';
import { THEME } from '../../global-styles';

const Wrapper = styled.aside`
  position: relative;
  .c-nav {
    ul {
      margin: 0;
      padding: 0;
    }

    .a-nav-item {
      color: #202124;
      display: block;
      font-size: 16px;
      opacity: 0.5;
      padding: 16px 40px;
      text-decoration: none;

      &:hover {
        background-color: ${THEME.colors.blacks[2]};
      }

      &.-active {
        background-color: ${THEME.colors.blacks[3]};
        opacity: 1;
      }
    }
  }

  .c-input__wrapper {
    bottom: 80px;
    left: 0;
    position: absolute;

    label {
      flex-direction: row-reverse;
      justify-content: space-between;
      padding: 16px 40px;

      .a-label {
        color: ${THEME.colors.blacks[7]};
        font-size: ${THEME.fontSizes[2]}px;
      }

      .a-checkbox {
        margin-right: 0;
      }
    }
  }
`;

export default Wrapper;
