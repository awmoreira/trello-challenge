import React from "react";
import { Container, BoxInputs } from "./styles";
import { FiX } from "react-icons/fi";
import { withTheme } from "styled-components";
import useKeyMouseToSaveClose from "../../hooks/useKeyMouseToSaveClose";
import useFocusInput from "../../hooks/useFocusInput";
import { TaskListContext } from "../../contexts/TaskListContext";

const NewTask = ({ theme, closeNewTask, listIndex, scrolDown }) => {
  const [inputTitle, setInputTitle] = React.useState("");
  const [inputDescription, setInputDescription] = React.useState("");
  const inputRefTitle = useFocusInput();

  const {
    taskListActions: { addNewTask },
  } = React.useContext(TaskListContext);

  const saveInputs = React.useCallback(() => {
    if (!inputTitle) return;
    addNewTask(inputTitle, inputDescription, listIndex);
    setInputTitle("");
    setInputDescription("");
    scrolDown();
  }, [setInputTitle, setInputDescription, addNewTask, inputTitle, inputDescription, listIndex, scrolDown]);

  const { containerRef } = useKeyMouseToSaveClose(saveInputs, closeNewTask);

  return (
    <Container ref={containerRef}>
      <BoxInputs>
        <input
          ref={inputRefTitle}
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          placeholder="Digite um título para o card..."
        />
        <textarea
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
          placeholder="Digite uma descrição..."
        />
      </BoxInputs>
      <div>
        <button
          onClick={() => {
            saveInputs();
          }}
        >
          Adicionar Card
        </button>
        <button onClick={closeNewTask}>
          <FiX size={24} color={theme.fontColor} />
        </button>
      </div>
    </Container>
  );
};

export default withTheme(NewTask);
