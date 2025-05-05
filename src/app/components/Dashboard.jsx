"use client";
import { useEffect } from "react";
import Draggable from "../components/Draggable";
import Column from "./Column";
import useTaskStore from "../store/useTaskStore";
import ToolBar from "./ToolBar";

export default function Dashboard({ dashboardId }) {
  const { columns, moveTask, loadTasksByDashboardId } = useTaskStore();
  useEffect(() => {
    loadTasksByDashboardId(dashboardId);
  }, []);
  const ParagraphStyle = "text-sm";
  return (
    <div className="flex h-dvh">
      <ToolBar />
      <div className="flex gap-6 max-w-4xl justify-center pt-8 mx-auto">
        {columns && (
          <>
            <Column
              id="todo"
              title="To Do"
              onDrop={(itemId) => moveTask(itemId, "todo")}
              count={columns.todo.length}
            >
              {columns.todo.map((item) => (
                <Draggable key={item.id} item={item}>
                  <p className={ParagraphStyle}>{item.text}</p>
                </Draggable>
              ))}
            </Column>

            <Column
              id="progress"
              title="In Progress"
              onDrop={(itemId) => moveTask(itemId, "progress")}
              count={columns.progress.length}
            >
              {columns.progress.map((item) => (
                <Draggable key={item.id} item={item}>
                  <p className={ParagraphStyle}>{item.text}</p>
                </Draggable>
              ))}
            </Column>

            <Column
              id="done"
              title="Done"
              onDrop={(itemId) => moveTask(itemId, "done")}
              count={columns.done.length}
            >
              {columns.done.map((item) => (
                <Draggable key={item.id} item={item}>
                  <p className={ParagraphStyle}>{item.text}</p>
                </Draggable>
              ))}
            </Column>
          </>
        )}
      </div>
    </div>
  );
}
