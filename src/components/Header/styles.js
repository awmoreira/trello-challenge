import styled from "styled-components";
import { transparentize } from "polished";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  padding: 4px;

  display: flex;
  background: ${({ theme }) => theme.transparency};
`;



export const HeaderBtnWrapper = styled.div.attrs(
  ({ right }) => ({
    right: right || false,
  })
)`
  width: 50%;
  display: grid;
  column-gap: 4px;
  grid-auto-flow: column;
  align-items: center;
  justify-content: ${({ right }) => (right ? "flex-end" : "flex-start")};
`;



export const HeaderBox = styled.div.attrs(
  ({ color }) => ({
    color: color || "rgba(255, 255, 255, .32)",
  })
)`
  border: none;
  background: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
  height: 32px;
  min-width: 32px;
  padding: 8px;
  color: white;
  font-weight: bolder;
  font-size: 14px;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: ${({ color }) => transparentize(0.1, color)};
  }
`;

export const HeaderAvatar = styled.div`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  background: #aaa;
`;

export const HeaderInput = styled(HeaderBox)`
  width: 100%;
`;

export const HeaderTitle = styled.div`
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  font-family: "Pacifico", cursive;
  font-size: 20px;
  display: flex;
  align-items: center;
  color: white;
`;
