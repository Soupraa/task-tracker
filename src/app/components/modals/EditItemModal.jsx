import React, { useState, useRef } from "react";
import useTaskStore from "../../store/useTaskStore";
import { isValidDescription, isValidLength } from "../constants";
import { Settings2 } from "lucide-react";
import ModalButtonGroup from "../ModalButtonGroup";
import useTagStore from "../../store/useTagStore";
import { TagSelector } from "../TagSelector";

export default function EditItemModal({ item }) {
  const modalRef = useRef(null);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.text);
  const [selectedTags, setSelectedTags] = useState(item.tags || []);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { updateTask } = useTaskStore();
  const { currentTags } = useTagStore(); 

  const openModal = () => {
    setTitle(item.title);
    setDescription(item.text);
    setSelectedTags(item.tags || []);
    setTitleError("");
    setDescriptionError("");
    setIsOpen(true);
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    setTitle(item.title);
    setDescription(item.text);
    setSelectedTags(item.tags || []);
    setIsOpen(false);
    modalRef.current?.close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      setTitleError("Title is required.");
      return;
    }
    if (!isValidLength(title, 100)) {
      setTitleError("Title cannot exceed 100 character limit.");
      return;
    }
    if (!isValidDescription(description)) {
      setDescriptionError("Description cannot exceed 500 character limit.");
      return;
    }

    await updateTask(item.id, {
      title,
      text: description,
      tags: selectedTags,
    });
    closeModal();
  };
  return (
    <div>
      <button
        onClick={openModal}
        className="cursor-pointer transition-all duration-300 ease-in-out hover:text-gray-400 rounded-l w-fit h-fit"
      >
        <div className="tooltip" data-tip="Edit">
          <Settings2 className="w-5" />
        </div>
      </button>

      <dialog
        ref={modalRef}
        className={`text-black m-auto rounded-md w-96 min-w-fit transition-all duration-300 ease-out ${
          isOpen ? "opacity-100 scale-100 backdrop:bg-black/30" : "opacity-0 scale-90"
        }`}
      >
        <div className="dark:bg-amber-300 h-[680px] max-w-2xl p-12 font-inter overflow-y-auto">
          <h1 className="text-3xl font-jersey mb-4">Update task</h1>
          <form onSubmit={handleSubmit}>
            <label className="text-sm font-semibold tracking-wide">Title</label>
            <input
              type="text"
              placeholder="Title"
              className="w-full bg-slate-100 rounded-xl mt-2 h-10 p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {titleError && <p className="text-red-500 text-sm my-2">{titleError}</p>}
            <div className="mb-5" />

            <label className="text-sm font-semibold tracking-wide">Description</label>
            <textarea
              placeholder="Description"
              className="w-full bg-slate-100 rounded-xl mt-2 h-40 p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {descriptionError && (
              <p className="text-red-500 text-sm my-2">{descriptionError}</p>
            )}
            <div className="mb-5" />

            <TagSelector
              availableTags={currentTags}
              selectedTags={selectedTags}
              onChange={setSelectedTags}
            />

            <div className="mt-8" />
            <ModalButtonGroup
              leftLabel={"Close"}
              rightLabel={"Update"}
              closeModalFunc={closeModal}
            />
          </form>
        </div>
      </dialog>
    </div>
  );
}