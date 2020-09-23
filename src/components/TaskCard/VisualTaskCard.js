import React from "react";
import { Card, Line } from "./styles";
import { FiEdit2 } from "react-icons/fi";

const TaskCard = ({ task, left, top, width }) => {

  return (
    <Card
      style={{
        width,
        position: "fixed",
        left,
        top,
        cursor: "grabbing",
        transform: "rotate(2.5deg)",
        boxShadow: "5px 5px 20px rgba(0, 0, 0, 0.3)",
        background: "white",
        pointerEvents: "none",
      }}
    >

      <p>{task.title}</p>
      <Line />
      <p>{task.description}</p>
      <button>
        <FiEdit2 size={18} />
      </button>
    </Card>
  );
};

export default TaskCard;
