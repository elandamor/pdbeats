import styled, { css } from 'styled-components';
import { space } from 'styled-system';
import { IInputProps } from './index';
import theme from '../../theme';

const Wrapper = styled.div`
  ${space};
  position: relative;
  width: 100%;

  .a-label {
    font-size: ${theme.fontSizes[1]}px;

    &.sr-only {
      height: 0;
      opacity: 0;
      position: absolute;
    }
  }

  .a-checkbox,
  .a-radio {
    border: ${theme.borders[2]} #969696;
    border-radius: 50%;
    cursor: pointer;
    display: inline-block;
    height: 1.25rem;
    margin-right: ${theme.space[1]}px;
    position: relative;
    vertical-align: middle;
    width: 1.25rem;
  }

  .a-checkbox {
    ${({ toggle }: IInputProps) => toggle && css`
      border: none;
      height: 1.25rem;
      width: 2rem;

      &::after, &::before {
        content: '';
        top: 0;
        left: 0;
        position: absolute;
      }

      &::before {
        width: 100%;
        height: 100%;
        border-radius: 0.75rem;
        background: #dbdbdb;
      }

      &::after {
        width: 1rem;
        height: 1rem;
        margin: 0.15rem;
        border-radius: 50%;
        background: #ffffff;
      }
    `}
  }

  input, textarea {
    background: transparent;
    border: ${theme.borders[1]} #aaaaaa;
    border-radius: ${theme.space[1] / 2}px;
    display: block;
    font-size: ${theme.fontSizes[1]}px;
    min-height: 36px;
    padding: ${theme.space[1]}px ${theme.space[1] + theme.space[1] / 2}px;
    position: relative;
    text-overflow: ellipsis;
    width: 100%;
    z-index: 1;

    ${({ type }: IInputProps) => (type === 'checkbox' || type === 'radio')
    && css`
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      opacity: 0;
      filter: alpha(opacity=0);
      position: absolute;
      visibility: hidden;
    `}

    &:focus,
    &:hover {
      border: ${theme.borders[1]} ${theme.colors.primary};
      outline: none;
    }

    &:hover ~ .a-checkbox {
      border-color: #4a4a4a;
    }

    &:hover ~ .a-radio {
      border: ${theme.borders[2]} #4a4a4a;
    }

    &:checked ~ .a-checkbox {
      border-color: ${theme.colors.primary};
      background: ${theme.colors.primary} url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=) center no-repeat;
      background-size: 75%;

      ${({ toggle }: IInputProps) => toggle && css`
        &::before {
          background: ${theme.colors.success};
          border-color: ${theme.colors.success};
        }

        &::after {
          left: auto;
          right: 0;
        }
      `};
    }

    &:checked ~ .a-radio {
      border: ${theme.borders[2]} #1785ff;

      &::after {
        content: '';
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 40%;
        height: 40%;
        margin: auto;
        position: absolute;
        border-radius: 30%;
        background: #1785ff;
      }
    }
  }

  ${({ readonly }: IInputProps) => readonly && css`
    opacity: 0.38;
    pointer-events: none;
  `}

  &[type='checkbox'],
  &[type='radio'] {
    label {
      align-items: center;
      cursor: pointer;
      display: flex;
    }
  }
`;

export const HelperText = styled.span`
  color: ${theme.colors.blacks[8]};
  display: block;
  font-size: ${theme.fontSizes[0]}px;
  padding:
    ${theme.space[1] / 2}px
    ${theme.space[1] + theme.space[1] / 2}px
    0
    ${theme.space[1] + theme.space[1] / 2}px;
`;

export default Wrapper;
