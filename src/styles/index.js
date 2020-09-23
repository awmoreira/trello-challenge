import { createGlobalStyle } from "styled-components";

export const defaultTheme = {
  fontColor: "#172b4d",
  transparency: "rgba(0, 0, 0, 0.32)",
  transparencyLight: "rgba(0, 0, 0, 0.16)",
  scrollBar: "#d9dce2",
  scrollThumb: "#bdc3ce",
  listColor: "#ebecf0",
  taskColor: "white",
  green: "#5aac44",
  red: "#eb5a46",
  black: "#344563",
};

export const GlobalStyles = createGlobalStyle`

  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }

  body{
    color: ${({ theme }) => theme.fontColor};
  }

  button {
    cursor: pointer;
  }

`;
