import styled from "styled-components";
import { darken, lighten, transparentize } from "polished";

export const Container = styled.div`
  position: fixed;
  z-index: 10;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .5);
  /* background:  ${({ theme }) => theme.transparency}; */
  cursor: auto;

  & > div {
    position: absolute;
    top: ${({ top }) => top + "px"};
    left: ${({ left }) => left + "px"};
    display: flex;
    padding-right: 8px;
    /* background: ${({ theme }) => theme.transparencyLight};
    box-shadow: 0 0 10px 10px ${({ theme }) => theme.transparencyLight}; */
  }
`;

export const EditZone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;

  & > div {
    width: ${({ width }) => width + "px"};
    min-height: ${({ height }) => height + "px"};
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    background: white;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding: 8px;

    :nth-of-type(2) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    & > input {
      width: 100%;
      background: ${({ theme }) => theme.taskColor};
      border-radius: 4px;
      border: none;
      border: 1px solid #bbb;
      padding: 8px;
      resize: vertical;
      font-size: 14px;
      color: ${({ theme }) => theme.fontColor};
      margin-bottom: 5px;

      ::placeholder {
        color: ${({ theme }) => transparentize(0.5, theme.fontColor)};
      }
    }

    & > textarea {
      width: 100%;
      background: ${({ theme }) => theme.taskColor};
      border-radius: 4px;
      border: vertical;
      border: 1px solid #bbb;
      padding: 8px;
      resize: none;
      font-size: 14px;
      color: ${({ theme }) => theme.fontColor};

    }

  }
`;

export const ButtonSave = styled.button`
  margin-top: 16px;
    padding: 8px 16px;
    background: ${({ theme }) => theme.green};
    color: white;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    transition: 0.1s;

    :hover {
      background: ${({ theme }) => lighten(0.1, theme.green)};
    }

    :active {
      background: ${({ theme }) => darken(0.1, theme.green)};
    }
`

export const ButtonDelete = styled.button`
    margin-top: 16px;
    padding: 8px 16px;
    background: ${({ theme }) => theme.red};
    color: white;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    transition: 0.1s;

    :hover {
      background: ${({ theme }) => lighten(0.1, theme.red)};
    }

    :active {
      background: ${({ theme }) => darken(0.1, theme.red)};
    }
`

