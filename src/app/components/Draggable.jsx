import { useState, useEffect, useRef } from "react";
import { X, Settings2 } from "lucide-react";
import useTaskStore from "../store/useTaskStore";
import EditItemModal from "./EditItemModal";

export default function Draggable({children, onDragEnd, item}) {
  const [isDragging, setIsDragging] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const { deleteTask } = useTaskStore();

  const handleDragStart = (e) => {
    console.log(e);
    e.dataTransfer.setData("text/plain", item.id);
    e.dataTransfer.effectAllowed = "move";
    setIsDragging(true);
    setTimeout(() => e.dataTransfer.setDragImage(new Image(), 0, 0), 0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (onDragEnd) onDragEnd();
  };

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent this click from triggering the document click handler
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close menu if clicked outside of menu or menu button
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    // Add event listener when menu is open
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);
  const handleDelete = async () => {
    await deleteTask(item.id);
  };
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="relative cursor-grab p-2 m-2 bg-amber-100 border-1 rounded-b-lg font-inter overflow-visible text-black"
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
      <div className="flex">
        <div className="inline-flex justify-end w-full gap-1">
          <EditItemModal item={item}/>
          <button
            onClick={handleDelete}
            className="cursor-pointer transition-all duration-300 ease-in-out hover:text-red-500 rounded-l w-fit h-fit"
          >
            <div className="tooltip" data-tip="Delete">
              <X className="w-5" />
            </div>
          </button>
        </div>
      </div>
      {/* Content with proper text formatting */}
      <div>
        <h3 className="text-3xl font-jersey break-words">{item.title}</h3>
        <div className="text-sm whitespace-normal break-words">{children}</div>
      </div>
    </div>
  );
}
