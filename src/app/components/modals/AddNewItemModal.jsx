import React, { useState } from "react";
import useTaskStore from "../../store/useTaskStore";
import { COLUMNS, isValidDescription, isValidLength } from "../constants";
import ModalButtonGroup from "../ModalButtonGroup";

export default function AddNewItemModal() {
  const modalRef = React.useRef(null);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [activeColumn, setActiveColumn] = useState(COLUMNS.TODO);
  const { addTask } = useTaskStore();

  const openModal = () => {
    setTitleError("");
    setTitle("");
    setDescription("");
    setDescriptionError("");
    setActiveColumn(COLUMNS.TODO);
    modalRef.current?.showModal();
  };

  const closeModal = () => {
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
      setTitleError("Title cannot exceed 100 character limit.");
      return;
    }
    await addTask(activeColumn, title, description);
    closeModal();
  };

  return (
    <div>
      <button
        className="border-2 px-4 py-2 w-fit font-jersey rounded-xl tracking-wide text-lg hover:bg-amber-100 transition-all cursor-pointer"
        type="button"
        onClick={openModal}
      >
        New task
      </button>
      <dialog ref={modalRef} id="my_modal_2" className="modal scrollbar-hide">
        <div className="modal-box h-[680px] max-w-md p-12 font-inter">
          <h1 className="text-3xl font-jersey mb-2">Add new task</h1>

          <form onSubmit={handleSubmit}>
            <label className="text-sm font-semibold tracking-wide">Title</label>
            <input
              name="name"
              type="text"
              placeholder="Title"
              className="w-full bg-slate-100 rounded-xl mt-2 h-10 p-2 text-black"
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
              className="w-full bg-slate-100 rounded-xl mt-2 h-40 p-2 text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {descriptionError && (
              <p className="text-red-500 text-sm my-2">{descriptionError}</p>
            )}
            <div className="mb-5" />
            <label className="text-sm font-semibold tracking-wide">
              Status
            </label>
            <select
              value={activeColumn}
              onChange={(e) => setActiveColumn(e.target.value)}
              className="p-2 border rounded-xl w-full bg-slate-100 mt-2 text-black cursor-pointer"
            >
              <option value="todo">To Do</option>
              <option value="progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <div className="mb-5" />
            <ModalButtonGroup
              leftLabel={"Close"}
              rightLabel={"Add"}
              closeModalFunc={closeModal}
            />
          </form>
        </div>
      </dialog>
    </div>
  );
}
