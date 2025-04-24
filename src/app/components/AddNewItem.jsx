import React, { useState } from "react";

export default function AddNewItem() {
  const modalRef = React.useRef(null);
  const [title, setTitle] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");

  const openModal = () => {
    setNameError("");
    setTitle("");
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const handleSubmit = (e) => {};
  return (
    <div>
      <button
        className="border-2 p-2 w-fit font-jersey rounded-2xl"
        type="button"
        onClick={openModal}
      >
        Add new
      </button>
      <dialog
        ref={modalRef}
        id="my_modal_2"
        className="text-black m-auto rounded-md w-96"
      >
        <div className="modal-box h-[680px] max-w-2xl p-12">
          <h1 className="text-3xl font-jersey mb-9">Add new task</h1>

          <form onSubmit={handleSubmit}>
            <label className="text-sm font-semibold tracking-wide">Title</label>
            <input
              name="name"
              type="text"
              placeholder="Title"
              className="w-full bg-slate-100 rounded-2xl mt-2 h-10 p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {nameError && (
              <p className="text-red-500 text-sm my-2">{nameError}</p>
            )}
            <div className="mb-5" />
            <textarea
              name="description"
              placeholder="Description"
              className="w-full bg-slate-100 rounded-2xl mt-2 h-40 p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
                Create
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
