"use client";
import { useState } from "react";
import Draggable from "../components/Draggable";
import Column from "./Column";
import AddNewItem from "./AddNewItem";

const initialColumns = {
  todo: [
    { id: "task1", text: "Design Homepage", title: "A LOOOnnnGGGGG TiTTTTTTLLLLLEEEE" },
    { id: "task2", text: "Implement API", title: "TiTTTTTTLLLLLEEEETiTTTTTTLLLLLEEEETiTTTTTTLLLLLEEEETiTTTTTTLLLLLEEEETiTTTTTTLLLLLEEEETiTTTTTTLLLLLEEEE" },
  ],
  progress: [{ id: "task3", text: "Build and maintain full stack web applications for new innovative projects. Collaborate closely with cross-functional teams, including designers, developers and product managers to create high quality web solutions. Ensure applications are accessible, performant, and responsive across devices, while applying best practices in web development.", title: "TITLE" }],
  done: [{ id: "task4", text: "Setup CI/CD Pipeline", title: "TITLE" }],
};

export default function Dashboard() {
  const [columns, setColumns] = useState(initialColumns);

  const handleDrop = (itemId, targetColumn) => {
    setColumns((prev) => {
      const newColumns = { ...prev };

      // Remove from current column
      Object.keys(newColumns).forEach((columnId) => {
        newColumns[columnId] = newColumns[columnId].filter(
          (item) => item.id !== itemId
        );
      });

      // Find the item
      const allItems = Object.values(prev).flat();
      const movedItem = allItems.find((item) => item.id === itemId);

      // Add to target column if item exists
      if (movedItem) {
        newColumns[targetColumn] = [...newColumns[targetColumn], movedItem];
      }

      return newColumns;
    });
  };
  const ParagraphStyle = 'text-sm'
  return (
    <div className="flex gap-6 max-w-4xl m-auto justify-center">
      <Column
        id="todo"
        title="To Do"
        onDrop={(itemId) => handleDrop(itemId, "todo")}
      >
        {columns.todo.map((item) => (
          <Draggable key={item.id} id={item.id} title={item.title}>
           <p className={ParagraphStyle}>{item.text}</p> 
           </Draggable>
        ))}
      </Column>

      <Column
        id="progress"
        title="In Progress"
        onDrop={(itemId) => handleDrop(itemId, "progress")}
      >
        {columns.progress.map((item) => (
          <Draggable key={item.id} id={item.id} title={item.title}>
           <p className={ParagraphStyle}>{item.text}</p> 
           </Draggable>
        ))}
      </Column>

      <Column
        id="done"
        title="Done"
        onDrop={(itemId) => handleDrop(itemId, "done")}
      >
        {columns.done.map((item) => (
          <Draggable key={item.id} id={item.id} title={item.title}>
           <p className={ParagraphStyle}>{item.text}</p> 
           </Draggable>
        ))}
      </Column>
    </div>
  );
}
