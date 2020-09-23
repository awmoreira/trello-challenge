import React from "react";
import { TaskListContext } from "../../../contexts/TaskListContext";
import useFocusInput from "../../../hooks/useFocusInput";
import useKeyMouseToSaveClose from "../../../hooks/useKeyMouseToSaveClose";
import { Container, EditZone, ButtonSave, ButtonDelete } from "./styles";

const TaskMenu = ({
  close,
  rect,
  task,
  listIndex,
  taskIndex,
}) => {
  const inputRef = useFocusInput();
  const [inputTitle, setInputTitle] = React.useState("");
  const [inputDescription, setInputDescription] = React.useState("");
  const {
    taskListActions: { deleteTask, editTaskTitleDescription },
  } = React.useContext(TaskListContext);

  React.useEffect(() => {
    setInputTitle(task.title);
    setInputDescription(task.description);
  }, [task.title, task.description]);

  const save = React.useCallback(() => {
    if (inputTitle === "") return;
    editTaskTitleDescription(inputTitle, inputDescription, taskIndex, listIndex);
    close();
  }, [inputTitle, inputDescription, close, editTaskTitleDescription, taskIndex, listIndex]);

  const { containerRef } = useKeyMouseToSaveClose(save, close);

  const y = Math.min(rect.y, window.innerHeight - 250);

  return (
    <Container onMouseDown={(e) => e.stopPropagation()} top={y} left={rect.x}>
      <div ref={containerRef}>
        <EditZone height={rect.height} width={rect.width}>
          <div>
            <input
              ref={inputRef}
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
            />
            <textarea
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
            />
          </div>
          <div>
            <ButtonSave onClick={save}>Salvar</ButtonSave>
            <ButtonDelete onClick={() => {
              deleteTask(taskIndex, listIndex);
            }}>Apagar</ButtonDelete>
          </div>
        </EditZone>
      </div>
    </Container>
  );
};

export default TaskMenu;
