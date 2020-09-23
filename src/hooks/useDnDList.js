import React from "react";
import { TaskListContext } from "../contexts/TaskListContext";

export const useDnDList = () => {
  const { allLists, setAllLists } = React.useContext(TaskListContext);
  const height = React.useRef(0);
  const [coord, setCoord] = React.useState({
    x: 0,
    y: 0,
  });

  const [dragging, setDragging] = React.useState(false);

  const mouseCoord = React.useRef({
    x: 0,
    y: 0,
  });

  const mouseOffset = React.useRef({
    x: 0,
    y: 0,
  });

  const listIndexRef = React.useRef(0);

  const onMouseDown = (
    listIndex,
    event,
    rect
  ) => {
    mouseOffset.current = {
      x: event.clientX - rect.x,
      y: event.clientY - rect.y,
    };
    listIndexRef.current = listIndex;
    height.current = rect.height;
    setPosition(event.clientX, event.clientY);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  const setPosition = React.useCallback((x, y) => {
    mouseCoord.current = { x, y };
    setCoord({ x: x - mouseOffset.current.x, y: y - mouseOffset.current.y });
  }, []);

  const mouseMove = React.useCallback(
    (ev) => {
      setDragging(true);
      document.body.style.cursor = "grabbing";
      setPosition(ev.clientX, ev.clientY);
    },
    [setPosition]
  );

  const mouseUp = React.useCallback(() => {
    document.body.style.cursor = "auto";
    setDragging(false);
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", mouseUp);
  }, [mouseMove]);

  const moveListHorizontally = React.useCallback(
    (toIndex) => {
      const newList = { ...allLists };

      const temp = newList.list[listIndexRef.current];
      newList.list[listIndexRef.current] = newList.list[toIndex];
      newList.list[toIndex] = temp;

      listIndexRef.current = toIndex;

      setAllLists(newList);
    },
    [allLists, setAllLists]
  );

  return {
    beginDragList: onMouseDown,
    draggedListIndex: listIndexRef.current,
    draggingList: dragging,
    draggedListCoord: coord,
    height: height.current,
    moveListHorizontally,
  };
};

export default useDnDList;
