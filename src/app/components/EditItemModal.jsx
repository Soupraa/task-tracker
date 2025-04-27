import React, { useState } from "react";
import useTaskStore from "../store/useTaskStore";
import { COLUMNS, isValidDescription } from "./constants";
import { Settings2 } from "lucide-react";

export default function EditItemModal({ item }) {
  const modalRef = React.useRef(null);
  const [title, setTitle] = useState(item.title);
  const [titleError, setTitleError] = useState("");
  const [description, setDescription] = useState(item.text);
  const [descriptionError, setDescriptionError] = useState("");
  const { updateTask } = useTaskStore();

  const openModal = () => {
    setTitle(item.title);
    setDescription(item.text);
    setTitleError("");
    setDescriptionError("");
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    setTitle(item.title);
    setDescription(item.text);
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
    console.log(title, description);
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
        className="text-black m-auto rounded-md w-96 min-w-fit"
      >
        <div
          className="dark:bg-amber-300 h-[680px] max-w-2xl p-12 font-inter"
        >
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
            <div className="flex justify-center gap-3 text-xl">
              <button
                className="border-2 p-2 w-[50%] font-jersey rounded-2xl tracking-wide hover:bg-red-400 transition-all"
                type="button"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="border-2 p-2 w-[50%] font-jersey rounded-2xl tracking-wide hover:bg-green-400 transition-all"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
