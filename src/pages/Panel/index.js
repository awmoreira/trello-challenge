import React from "react";
import CardList from "../../components/CardList";
import VisualList from "../../components/CardList/visualList";
import NewList from "../../components/NewList";
import VisualTaskCard from "../../components/TaskCard/VisualTaskCard";
import DndTaskContext from "../../contexts/DndTaskContext";

import { TaskListContext } from "../../contexts/TaskListContext";
import useDndList from "../../hooks/useDnDList";
import { useDndTask } from "../../hooks/useDndTask";
import useMouseScrollHorizontal from "../../hooks/useMouseScrollHorizontal";
import {
  Container,
  ListContainter,
  Loader,
} from "./styles";

const Panel = () => {
  const { allLists, taskListActions: {
    addList,
  } } = React.useContext(TaskListContext);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    function createList() {
      addList("To Do");
      addList("Doing");
      addList("Done");
      setLoading(false);
    }

    createList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    beginDragList,
    draggedListIndex,
    draggingList,
    draggedListCoord,
    height,
    moveListHorizontally,
  } = useDndList();

  const {
    beginTaskDrag,
    coord,
    taskDragging,
    dragIndexes,
    moveTaskVertically,
    width,
    moveTaskHorizontally,
    height: taskHeight,
  } = useDndTask();

  const { scrollRef, scrollToRight } = useMouseScrollHorizontal(draggingList);

  const dndContextValue = React.useMemo(
    () => ({
      beginTaskDrag,
      taskDragging,
      taskIndex: dragIndexes.taskIndex,
      listIndex: dragIndexes.listIndex,
      moveTaskVertically,
      moveTaskHorizontally,
      height: taskHeight,
    }),
    [
      dragIndexes.taskIndex,
      dragIndexes.listIndex,
      taskDragging,
      beginTaskDrag,
      moveTaskVertically,
      moveTaskHorizontally,
      taskHeight,
    ]
  );

  return (
    <DndTaskContext.Provider value={dndContextValue}>
      <Container>
        {!loading ? (
          <>
            <ListContainter id="scroll-test" ref={scrollRef}>
              {allLists.list.map((list, index) => (
                <CardList
                  selfTaskDragging={
                    taskDragging && dragIndexes.listIndex === index
                  }
                  key={list.id}
                  listIndex={index}
                  list={list}
                  beginDragList={beginDragList}
                  draggingSelf={draggingList && draggedListIndex === index}
                  draggingList={draggingList}
                  moveListHorizontally={moveListHorizontally}
                />
              ))}
              <NewList scrollToRight={scrollToRight} />
              <div
                style={{
                  minWidth: "8px",
                  height: "100%",
                  margin: 0,
                }}
              />
            </ListContainter>
          </>
        ) : (
           <Loader />
         )}
        {taskDragging && (
          <VisualTaskCard
            task={
              allLists.list[dragIndexes.listIndex].tasks[dragIndexes.taskIndex]
            }
            left={coord.x}
            top={coord.y}
            width={width}
          />
        )}

        {draggingList && (
          <VisualList
            list={allLists.list[draggedListIndex]}
            listIndex={draggedListIndex}
            left={draggedListCoord.x}
            top={draggedListCoord.y}
            height={height}
          />
        )}
      </Container>
    </DndTaskContext.Provider>
  );
};

export default Panel;
