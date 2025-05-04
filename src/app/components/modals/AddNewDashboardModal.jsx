import React, { useState } from "react";
import { Plus } from "lucide-react";
import ModalButtonGroup from "../ModalButtonGroup";
import useDashboardStore from "@/app/store/useDashboardStore";
import { isValidLength } from "../constants";

export default function AddNewDashboardModal() {
  const { addNewDashboard } = useDashboardStore();
  const modalRef = React.useRef(null);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setTitle("");
    setTitleError("");
    setIsOpen(true);
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    setTitle("");
    setTitleError("");
    setIsOpen(false);
    modalRef.current?.close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validation
    if (!title.trim()) {
      setTitleError("Title is required.");
      return;
    }
    if (!isValidLength(title, 30)) {
      setTitleError("Name cannot exceed 30 character limit.");
      return;
    }
    await addNewDashboard(title);
    closeModal();
  };

  return (
    <>
      <div className="tooltip" data-tip="Add new dashboard">
        <button
          onClick={openModal}
          className={
            "px-4 py-2 rounded-t-2xl w-fit cursor-pointer font-oswald tracking-wide align-middle hover:bg-white transition-all"
          }
        >
          <Plus />
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
        <div className="dark:bg-amber-300 h-[380px] max-w-2xl p-12 font-inter">
          <h1 className="text-3xl font-jersey mb-2">Add new dashboard</h1>

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
            <div className="mb-5" />
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
