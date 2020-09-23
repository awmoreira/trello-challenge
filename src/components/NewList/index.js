import React from "react";
import { FiX } from "react-icons/fi";
import { withTheme } from "styled-components";
import useKeyMouseToSaveClose from "../../hooks/useKeyMouseToSaveClose";
import { Container } from "./styles";
import { TaskListContext } from "../../contexts/TaskListContext";

const NewList = ({ theme, scrollToRight }) => {
  const {
    taskListActions: { addList },
  } = React.useContext(TaskListContext);

  const [creatingNewList, setCreatingNewList] = React.useState(false);
  const inputRef = React.useRef(null);
  const [input, setInput] = React.useState("");
  const saveInput = React.useCallback(() => {
    if (!creatingNewList || !input) return;
    addList(input);
    setInput("");
    scrollToRight();
  }, [setInput, input, addList, creatingNewList, scrollToRight]);

  const close = React.useCallback(() => setCreatingNewList(false), []);
  const open = React.useCallback(() => {
    setCreatingNewList(true);
  }, []);

  React.useLayoutEffect(() => {
    if (creatingNewList) {
      (inputRef.current).focus();
    }
  }, [creatingNewList]);

  const { containerRef } = useKeyMouseToSaveClose(saveInput, close);

  return (
    <Container creating={creatingNewList} ref={containerRef}>
      <div>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite um título para a lista..."
        />
        <div>
          <button
            onClick={() => {
              saveInput();
            }}
          >
            Adicionar lista
          </button>
          <button onClick={close}>
            <FiX size={24} color={theme.fontColor} />
          </button>
        </div>
      </div>
      <p onClick={open}>Adicionar nova lista</p>
    </Container>
  );
};

export default withTheme(NewList);
