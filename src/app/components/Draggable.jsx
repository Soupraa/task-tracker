import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronsDownUp, Strikethrough, X } from "lucide-react";
import useTaskStore from "../store/useTaskStore";
import EditItemModal from "./modals/EditItemModal";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

export default function Draggable({ children, onDragEnd, item }) {
  const [isDragging, setIsDragging] = useState(false);
  const strike = item.strike;
  const isOpen = item.isOpen ?? true;
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const { deleteTask, updateTask } = useTaskStore();

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", item.id);
    e.dataTransfer.effectAllowed = "move";
    setIsDragging(true);
    setTimeout(() => e.dataTransfer.setDragImage(new Image(), 0, 0), 0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (onDragEnd) onDragEnd();
  };

  const handleDelete = async () => {
    await deleteTask(item.id);
  };

  const handleStrike = async () => {
    await updateTask(item.id, { strike: !strike });
  };

  const handleCollapse = async () => {
    await updateTask(item.id, { isOpen: !isOpen });
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="relative cursor-grab p-2 m-2 bg-amber-100 border rounded-b-lg font-inter overflow-visible text-black"
      style={{
        boxShadow: isDragging
          ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        transform: isDragging ? "scale(1.02)" : "scale(1)",
        transition: "all 0.2s ease",
        opacity: isDragging ? 0.9 : 1,
        userSelect: "none",
      }}
    >
      <div className="flex justify-between items-start">
        <button
          onClick={handleCollapse}
          className="cursor-pointer transition-all duration-300 ease-in-out hover:text-red-500 w-fit h-fit"
        >
          <div className="tooltip" data-tip={isOpen ? "Collapse" : "Expand"}>
            <ChevronRight
              className={`w-5 transition-transform duration-300 ${
                isOpen ? "rotate-90" : ""
              }`}
            />{" "}
          </div>
        </button>
        <div className="flex gap-1">
          <button
            onClick={handleStrike}
            className="cursor-pointer transition-all duration-300 ease-in-out hover:text-red-500 w-fit h-fit"
          >
            <div className="tooltip" data-tip="Strike">
              <Strikethrough className="w-5" />
            </div>
          </button>
          <EditItemModal item={item} />
          <button
            onClick={handleDelete}
            className="cursor-pointer transition-all duration-300 ease-in-out hover:text-red-500 w-fit h-fit"
          >
            <div className="tooltip" data-tip="Delete">
              <X className="w-5" />
            </div>
          </button>
        </div>
      </div>

      <div>
        <Accordion
          expanded={isOpen}
          onChange={handleCollapse}
          disableGutters
          elevation={0}
          square
          sx={{ background: "none", border: "none", boxShadow: "none" }}
        >
          <AccordionSummary
            id={`panel-${item.id}`}
            style={{
              overflowWrap: "break-word",
              wordBreak: "break-word",
              whiteSpace: "normal",
              display: "block",
              padding: 0,
            }}
          >
            <h3 className="text-xl font-oswald break-words tracking-wide">
              {strike ? <s>{item.title}</s> : item.title}
            </h3>
          </AccordionSummary>
          <AccordionDetails style={{ padding: "0" }}>
            <div className="text-sm whitespace-normal break-words">
              {strike ? <s>{children}</s> : children}
            </div>
          </AccordionDetails>
        </Accordion>
        <div className="mt-2 gap-1 flex flex-wrap">
          {item.tags?.map((t, k) => (
            <div
              key={k}
              style={{ backgroundColor: t.color }}
              className="w-fit p-1 font-inter my-0.5 text-xs inline-flex rounded-sm"
            >
              {t.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
