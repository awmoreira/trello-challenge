import React from "react";
import { FiPlus } from "react-icons/fi";
import useMouseScroll from "../../hooks/useMouseScrollVertical";
import NewTask from "../NewTask";
import TaskCard from "../TaskCard";
import {
  CardContent,
  CardHeader,
  Container,
  NewTaskBtn,
  Shadow,
  TaskContainer,
} from "./styles";

import CardListEdit from "./CardListEditCard";
import DndTaskContext from "../../contexts/DndTaskContext";

const CardList = ({
  list,
  listIndex,
  selfTaskDragging,
  beginDragList,
  draggingSelf,
  draggingList,
  moveListHorizontally,
}) => {
  const [editing, setEditing] = React.useState(false);
  const contentRef = React.useRef(null);
  const { scrollRef, scrolDown } = useMouseScroll(selfTaskDragging);
  const [addingTask, setAddingTask] = React.useState(false);

  const { taskDragging, moveTaskHorizontally } = React.useContext(
    DndTaskContext
  );

  const handleMouseDown = (
    event
  ) => {
    event.preventDefault();
    if (event.button !== 0) return;

    beginDragList(
      listIndex,
      event,
      (contentRef.current).getBoundingClientRect()
    );
  };

  const handleMouseEnter = () => {
    if (draggingList && !draggingSelf) moveListHorizontally(listIndex);
    else if (taskDragging) moveTaskHorizontally(listIndex);
  };

  return (
    <Container onMouseEnter={handleMouseEnter}>
      <CardContent dragging={draggingSelf} ref={contentRef}>
        <CardHeader
          selfTaskDragging={selfTaskDragging}
          dragging={draggingSelf}
          onMouseDown={handleMouseDown}
        >
          <div onClick={() => setEditing(true)}>
            <p>{list.title}</p>
            {editing && (
              <CardListEdit
                close={() => setEditing(false)}
                listIndex={listIndex}
                title={list.title}
              />
            )}
          </div>
        </CardHeader>
        <TaskContainer dragging={draggingSelf} ref={scrollRef}>
          {list.tasks.map((task, taskIndex) => (
            <TaskCard
              key={task.id}
              task={task}
              listIndex={listIndex}
              index={taskIndex}
            />
          ))}
        </TaskContainer>
        {addingTask ? (
          <NewTask
            listIndex={listIndex}
            closeNewTask={() => setAddingTask(false)}
            scrolDown={scrolDown}
          />
        ) : (
          <NewTaskBtn
            selfTaskDragging={selfTaskDragging}
            dragging={draggingSelf}
            onClick={() => setAddingTask(true)}
          >
            <FiPlus size={16} />
            {list.tasks.length > 0 ? (
              <p>Adicionar outro card</p>
            ) : (
              <p>Adicionar um card</p>
            )}
          </NewTaskBtn>
        )}
        <Shadow dragging={draggingSelf} />
      </CardContent>
    </Container>
  );
};
export default CardList;
