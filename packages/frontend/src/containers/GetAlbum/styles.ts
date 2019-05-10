import styled from 'styled-components';

const Wrapper = styled.div`
  --banner-height: calc(40vw / (16/9));

  .c-banner {
    align-items: flex-end;
    display: flex;
    height: var(--banner-height);
    padding: 12px;

    &:before {
      background-color: ${(props) => props.theme.colors.cardBorderColor};
      content: '';
      height: calc(var(--banner-height) + 80px);
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
`;

export default Wrapper;
