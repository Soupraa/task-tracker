import React, { useState } from "react";
import { Plus } from "lucide-react";
import ModalButtonGroup from "../ModalButtonGroup";
import { isValidLength } from "../constants";
import ColorSelector from "../ColorSelector";
import useTagStore from "@/app/store/useTagStore";
import useDashboardStore from "@/app/store/useDashboardStore";
import { v4 as uuidv4 } from 'uuid';

export default function AddNewTagModal() {
  const modalRef = React.useRef(null);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedColorError, setSelectedColorError] = useState("");
  const { addNewDashboardTag } = useTagStore();
  const { currentDashboardId } = useDashboardStore();

  const clearStates = () => {
    setTitle("");
    setTitleError("");
    setSelectedColor(null);
    setSelectedColorError("");
  };
  const openModal = () => {
    clearStates();
    setIsOpen(true);
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    clearStates();
    setIsOpen(false);
    modalRef.current?.close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError("");
    setSelectedColorError("");

    if (!title.trim()) {
      setTitleError("Name is required.");
      return;
    }
    if (!isValidLength(title, 30)) {
      setTitleError("Name cannot exceed 30 character limit.");
      return;
    }
    if (!selectedColor) {
      setSelectedColorError("Please select a color for the tag.");
      return;
    }
    await addNewDashboardTag(currentDashboardId, {
      id: uuidv4(),
      title: title,
      color: selectedColor,
    });
    closeModal();
  };

  return (
    <>
      <div
        className="tooltip transition-all duration-300 ease-in-out hover:text-green-500 my-auto"
        data-tip="Add tag"
      >
        <button className="cursor-pointer" onClick={openModal}>
          <Plus className="inline items-center" />
        </button>
      </div>
      <dialog
        ref={modalRef}
        id="my_modal_2"
        className={`text-black m-auto rounded-md w-96 min-w-fit transition-all duration-300 ease-out
          ${
            isOpen
              ? "opacity-100 scale-100 backdrop:bg-black/30 "
              : "opacity-0 scale-90"
          }`}
      >
        <div className="dark:bg-amber-300 h-[560px] max-w-2xl p-12 font-inter">
          <h1 className="text-3xl font-jersey mb-2">Add a new tag</h1>

          <form onSubmit={handleSubmit}>
            <label className="text-sm font-semibold tracking-wide">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="w-full bg-slate-100 rounded-xl mt-2 h-10 p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {titleError && (
              <p className="text-red-500 text-sm my-2">{titleError}</p>
            )}
            <div className="mb-8" />

            <label className="text-sm font-semibold tracking-wide">Color</label>
            <ColorSelector
              selected={selectedColor}
              setSelected={setSelectedColor}
            />
            {selectedColorError && (
              <p className="text-red-500 text-sm my-4">{selectedColorError}</p>
            )}
            <div className="mb-12" />
            <ModalButtonGroup
              leftLabel={"Close"}
              rightLabel={"Add"}
              closeModalFunc={closeModal}
            />
          </form>
        </div>
      </dialog>
    </>
  );
}
