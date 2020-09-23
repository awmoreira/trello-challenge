import styled, { css } from "styled-components";
import { darken } from "polished";

export const Card = styled.div`
  position: relative;
  max-width: 256px;
  flex: 1;
  background: ${({ theme }) => theme.taskColor};
  padding: 8px;
  border-radius: 4px;
  border-bottom: 1px solid ${({ dragging }) => (dragging ? "#ddd" : "#bbb")};
  word-wrap: break-word;
  font-size: 14px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  cursor: inherit;

  & > button {
    position: absolute;
    top: 4px;
    right: 4px;
    border: none;
    background: none;
    opacity: 0.5;
    border-radius: 4px;

    place-content: center;
    width: 20px;
    height: 20px;

    :hover {
      opacity: 1;
      background: ${({ theme }) => theme.transparencyLight};
    }
  }

  ${({ dragging }) =>
    !dragging &&
    css`
      :hover > button {
        display: grid;
      }
    `}


  p {
    max-width: calc(100% - 16px);
    margin-right: 16px;
    font-weight: 700;
    font-size: 14px;


    :nth-of-type(2) {
      font-size: 12px;
    }
  }

  ${({ taskDragging }) =>
    !taskDragging &&
    css`
      cursor: pointer;

      &:hover {
        background: ${({ theme }) => darken(0.1, theme.taskColor)};
      }
    `}

  p {
    opacity: ${({ dragging }) => (dragging ? 0 : 1)};
  }

  transition: max-height 0.2s, padding 0.2s, border 0.2s;

  & + div {
    margin-top: ${({ hide }) => (hide ? "0" : "8px")};
  }

  ${({ hide }) =>
    hide &&
    css`
      max-height: 0;
      padding: 0;
      border: 0;
      overflow: hidden;
    `}
`;

export const Shadow = styled.div`
  display: ${({ dragging }) => (dragging ? "block" : "none")};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: ${({ theme }) => theme.transparency};
`;

export const Line = styled.div`
    width: 100%;
    height: 1px;
    background: ${({ theme}) => theme.black};
    margin: 5px 0;
`

