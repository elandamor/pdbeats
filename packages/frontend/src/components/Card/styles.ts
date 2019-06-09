import styled, { css } from "styled-components";
import { IProps } from "./index";
import { ITheme } from "../../global-styles";
import { color } from 'styled-system';

const Wrapper = styled.div`
  border-radius: 4px;
  box-shadow: 0 10px 10px -6px rgba(214, 219, 230, 0.6);
  background-color: ${({ theme }: ITheme) => theme.colors.cardBackground};
  position: relative;
  width: 100%;

  ${color};

  &:active {
    transform: scale(0.95);
    transition: transform .195s ease-out;
  }

  ${({ compact }: IProps) => compact && css`
    background-color: ${(props) => props.theme.colors.sidebarBackground};
    border: thin solid ${(props) => props.theme.colors.cardBorderColor};
    margin: 0;

    img {
      border-radius: 4px 4px 0 0;
      height: auto;
      width: 100%;
    }

    figcaption {
      background-color: ${(props) => props.theme.colors.cardBorderColor};
      border-radius: 0 0 4px 4px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 48px;
      padding: 16px;
      text-align: center;
    }

    .c-details {
      font-size: 13px;

      h3 {
        margin: 0;
      }

      small {
        color: #555;
        display: none;
        margin-top: 8px;
      }
    }
  `}
`;

export const Content = styled.div`
  ${({ contentPadding }: IProps) =>
    contentPadding &&
    css`
      padding: ${contentPadding}px;
    `}
`;

export const Description = styled.p`
  font-size: ${({ theme }: ITheme) => theme.fontSizes[0]};
  color: ${({ theme }: ITheme) => theme.colors.textColorDark};
  line-height: 1.5;
`;

export const Title = styled.h3`
  font-weight: 500;
  color: ${({ theme }: ITheme) => theme.colors.textColorDark};
  margin-top: 0;

  svg {
    margin-bottom: -6px;
    margin-right: 10px;
  }
`;

export default Wrapper;
