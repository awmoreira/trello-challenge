import React from "react";
import shortid from "shortid";

export const TaskListContext = React.createContext({
  allLists: {
    list: [],
  },
  setAllLists: () => {},
  taskListActions: {
    deleteTask: (taskIndex, listIndex) => {},
    addNewTask: (title, listIndex) => {},
    deleteList: (listIndex) => {},
    addList: (title) => {},
    editListTitle: (title, listIndex) => {},
    editTaskTitleDescription: (title, description, taskIndex, listIndex) => {},
    editCompleteState: (
      state,
      taskIndex,
      listIndex
    ) => {},
  },
});



export const TaskListProvider = ({ children }) => {
  const [allLists, setAllLists] = React.useState({
    list: [],
  });
  const deleteTask = React.useCallback(
    (taskIndex, listIndex) => {
      const newList = { ...allLists };

      newList.list[listIndex].tasks.splice(taskIndex, 1);

      setAllLists(newList);
    },
    [allLists, setAllLists]
  );

  const addNewTask = React.useCallback(
    (title, description, listIndex) => {
      const newList = { ...allLists };
      const newTask = {
        labels: [],
        title,
        description,
        id: shortid.generate(),
        date: "",
        complete: false,
      };
      newList.list[listIndex].tasks.push(newTask);
      setAllLists(newList);
    },
    [allLists, setAllLists]
  );

  const deleteList = React.useCallback(
    (listIndex) => {
      const newList = { ...allLists };

      newList.list.splice(listIndex, 1);

      setAllLists(newList);
    },
    [allLists, setAllLists]
  );

  const addList = React.useCallback(
    (title) => {
      const newList = { ...allLists };

      const list = {
        id: shortid.generate(),
        tasks: [],
        title,
      };

      newList.list.push(list);

      setAllLists(newList);
    },
    [allLists, setAllLists]
  );

  const editListTitle = React.useCallback(
    (title, listIndex) => {
      const newList = { ...allLists };
      newList.list[listIndex].title = title;
      setAllLists(newList);
    },
    [allLists, setAllLists]
  );

  const editTaskTitleDescription = React.useCallback(
    (title, description, taskIndex, listIndex) => {
      const newList = { ...allLists };
      newList.list[listIndex].tasks[taskIndex].title = title;
      newList.list[listIndex].tasks[taskIndex].description = description;
      setAllLists(newList);
    },
    [allLists, setAllLists]
  );

  const editCompleteState = React.useCallback(
    (state, taskIndex, listIndex) => {
      const newList = { ...allLists };
      newList.list[listIndex].tasks[taskIndex].complete = state;
      setAllLists(newList);
    },
    [allLists, setAllLists]
  );

  const taskListActions = React.useMemo(
    () => ({
      deleteTask,
      addNewTask,
      deleteList,
      addList,
      editListTitle,
      editTaskTitleDescription,
      editCompleteState,
    }),
    [
      deleteTask,
      addNewTask,
      deleteList,
      addList,
      editListTitle,
      editTaskTitleDescription,
      editCompleteState,
    ]
  );

  return (
    <TaskListContext.Provider
      value={{ allLists, setAllLists, taskListActions }}
    >
      {children}
    </TaskListContext.Provider>
  );
};
