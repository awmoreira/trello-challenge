import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";

import TaskCard from "../TaskCard";
import { CardContent, CardHeader, NewTaskBtn, TaskContainer } from "./styles";

const CardList = ({ list, listIndex, top, left, height }) => {
  return (
    <CardContent
      style={{
        position: "fixed",
        left,
        top,
        height,
        transform: "rotate(2.5deg)",
        boxShadow: "5px 5px 20px rgba(0, 0, 0, 0.3)",
        pointerEvents: "none",
      }}
    >
      <CardHeader
        style={{
          cursor: "grabbing",
        }}
      >
        <div>
          <p>{list.title}</p>
        </div>
        <button>
          <BsThreeDots size={16} />
        </button>
      </CardHeader>
      <TaskContainer>
        {list.tasks.map((task, taskIndex) => (
          <TaskCard
            key={task.id}
            task={task}
            listIndex={listIndex}
            index={taskIndex}
          />
        ))}
      </TaskContainer>
      <NewTaskBtn>
        <FiPlus />
        <p>Adicionar outro cartão</p>
      </NewTaskBtn>
    </CardContent>
  );
};
export default CardList;
