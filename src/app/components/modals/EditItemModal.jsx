import React, { useState } from "react";
import useTaskStore from "../../store/useTaskStore";
import { isValidDescription, isValidLength } from "../constants";
import { Settings2 } from "lucide-react";
import ModalButtonGroup from "../ModalButtonGroup";

export default function EditItemModal({ item }) {
  const modalRef = React.useRef(null);
  const [title, setTitle] = useState(item.title);
  const [titleError, setTitleError] = useState("");
  const [description, setDescription] = useState(item.text);
  const [descriptionError, setDescriptionError] = useState("");
  const { updateTask } = useTaskStore();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setTitle(item.title);
    setDescription(item.text);
    setTitleError("");
    setDescriptionError("");
    setIsOpen(true); // <-- set state first
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    setTitle(item.title);
    setDescription(item.text);
    setIsOpen(false); // <-- hide with transition
    modalRef.current?.close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    if (!title.trim()) {
      setTitleError("Title is required.");
      return;
    }
    if (!isValidDescription(description)) {
      setDescriptionError("Description cannot exceed 500 character limit.");
      return;
    }
    if (!isValidLength(title, 100)) {
      setTitleError("Title cannot exceed 100 character limit.")
      return;
    }
    await updateTask(item.id, { title: title, text: description });
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
        id="my_modal_2"
        className={`text-black m-auto rounded-md w-96 min-w-fit transition-all duration-300 ease-out
          ${
            isOpen
              ? "opacity-100 scale-100 backdrop:bg-black/30 "
              : "opacity-0 scale-90"
          }`}
      >
        <div className="dark:bg-amber-300 h-[680px] max-w-2xl p-12 font-inter">
          <h1 className="text-3xl font-jersey mb-2">Update task</h1>

          <form onSubmit={handleSubmit}>
            <label className="text-sm font-semibold tracking-wide">Title</label>
            <input
              name="name"
              type="text"
              placeholder="Title"
              className="w-full bg-slate-100 rounded-xl mt-2 h-10 p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {titleError && (
              <p className="text-red-500 text-sm my-2">{titleError}</p>
            )}
            <div className="mb-5" />
            <label className="text-sm font-semibold tracking-wide">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              className="w-full bg-slate-100 rounded-xl mt-2 h-40 p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {descriptionError && (
              <p className="text-red-500 text-sm my-2">{descriptionError}</p>
            )}
            <div className="mb-5" />
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
