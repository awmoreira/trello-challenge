import React from "react";
import styled, { withTheme } from "styled-components";
import useKeyMouseToSaveClose from "../../../hooks/useKeyMouseToSaveClose";
import useFocusInput from "../../../hooks/useFocusInput";
import { TaskListContext } from "../../../contexts/TaskListContext";
import { FiX } from "react-icons/fi";

const CardlistEditCard = ({ title, close, listIndex, theme }) => {
  const [inputTitle, setInputTitle] = React.useState("");

  const {
    taskListActions: { editListTitle },
  } = React.useContext(TaskListContext);

  const save = React.useCallback(() => {
    if (!inputTitle) return;
    editListTitle(inputTitle, listIndex);
    close();
  }, [inputTitle, close, editListTitle, listIndex]);

  const { containerRef } = useKeyMouseToSaveClose(save, close);
  const inputRef = useFocusInput();

  React.useEffect(() => {
    setInputTitle(title);
  }, [title]);

  return (
    <Container ref={containerRef}>
      <Input
        ref={inputRef}
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
      />
      <Btn
        onClick={(e) => {
          close();
          e.stopPropagation();
        }}
      >
        <FiX size={20} color={theme.red} />
      </Btn>
    </Container>
  );
};

const Container = styled.div`
  top: 4px;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Btn = styled.div`
  position: absolute;
  top: 50%;
  right: 40px;
  transform: translateY(-50%);
  display: grid;
  place-content: center;
  height: 20px;
  width: 20px;

  opacity: 0.5;

  :hover {
    opacity: 1;
  }
`;

const Input = styled.input`
  width: calc(100% - 32px);
  height: calc(100% - 4px);
  border: none;
  background: none;
  padding: 10px 12px;
  padding-right: 28px;
  font-size: 14px;
  font-weight: 700;
  background: ${({ theme }) => theme.taskColor};
  border: 2px solid ${({ theme }) => theme.red};
  border-radius: 4px;
  color: ${({ theme }) => theme.fontColor};
`;

export default withTheme(CardlistEditCard);
