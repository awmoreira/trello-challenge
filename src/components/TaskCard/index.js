import React from "react";
import { FiEdit2 } from "react-icons/fi";
import DndTaskContext from "../../contexts/DndTaskContext";
import { Card, Line, Shadow } from "./styles";
import TaskMenu from "./TaskMenu";

export const checkRangeY = (
  rect,
  coord,
  draggedTaskHeight
) => {
  if (
    coord.y > rect.y + rect.height * 0.5 &&
    coord.y >= rect.y + rect.height - draggedTaskHeight
  )
    return 0;
  else if (
    coord.y < rect.y + rect.height * 0.5 &&
    coord.y <= rect.y + draggedTaskHeight
  )
    return -1;
  else return 1;
};

const TaskCard = ({ task, listIndex, index }) => {
  const containerRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const hideRef = React.useRef(false);

  const {
    beginTaskDrag,
    taskDragging,
    listIndex: draggedListIndex,
    taskIndex: draggedTaskIndex,
    moveTaskVertically,
    height: draggedTaskHeight,
  } = React.useContext(DndTaskContext);

  const dragging =
    taskDragging &&
    draggedListIndex === listIndex &&
    draggedTaskIndex === index;

  const mouseMoveHandle = React.useCallback(
    (event) => {
      if (!taskDragging || dragging) return;
      const rect = (containerRef.current).getBoundingClientRect();
      const coord = {
        x: event.clientX,
        y: event.clientY,
      };
      const check = checkRangeY(rect, coord, draggedTaskHeight);
      if (check > 0) return;
      const toIndex = index + check + 1;
      if (toIndex !== draggedTaskIndex) moveTaskVertically(toIndex);
    },
    [
      dragging,
      index,
      moveTaskVertically,
      draggedTaskIndex,
      taskDragging,
      draggedTaskHeight,
    ]
  );

  const handleLeftMouseDown = React.useCallback(
    (event) => {
      beginTaskDrag(
        index,
        listIndex,
        event,
        (containerRef.current).getBoundingClientRect()
      );
    },
    [beginTaskDrag, index, listIndex]
  );

  const handleRightMouseDown = React.useCallback(
    (event) => {
      setMenuOpen(true);
    },
    []
  );

  const handleMouseDown = React.useCallback(
    (event) => {
      event.preventDefault();
      if (event.button === 0) {
        handleLeftMouseDown(event);
      } else {
        handleRightMouseDown(event);
      }
    },
    [handleLeftMouseDown, handleRightMouseDown]
  );

  return (
    <Card
      hide={hideRef.current}
      taskDragging={taskDragging}
      dragging={dragging}
      ref={containerRef}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={mouseMoveHandle}
    >

      <p>{task.title}</p>
      <Line />
      <p>{task.description}</p>
      <button onClick={() => setMenuOpen(true)}>
        <FiEdit2 size={14} />
      </button>
      <Shadow dragging={dragging} />
      {menuOpen && (
        <TaskMenu
          taskIndex={index}
          listIndex={listIndex}
          rect={(containerRef.current).getBoundingClientRect()}
          close={() => setMenuOpen(false)}
          task={task}
        />
      )}
    </Card>
  );
};

export default TaskCard;
