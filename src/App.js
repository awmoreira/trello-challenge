import React from 'react';
import { GlobalStyles, defaultTheme } from "./styles";
import { ThemeProvider } from "styled-components";
import Panel from "./pages/Panel";
import Header from "./components/Header";
import styled from "styled-components";
import { TaskListProvider } from "./contexts/TaskListContext";

function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
          <TaskListProvider>
            <Container>
              <Header />
              <Panel />
            </Container>
          </TaskListProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  background: #0079bf;
`;
