import React, { useState, useEffect, useRef, useCallback } from "react";
import ModalButtonGroup from "../ModalButtonGroup";
import { isValidLength } from "../constants";
import ColorSelector from "../ColorSelector";
import useTagStore from "@/app/store/useTagStore";

export default function EditTagModal({ showModal, setShowModal }) {
  const modalRef = useRef(null);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedColorError, setSelectedColorError] = useState("");

  const { tagIdToEdit, getTagById, updateTag } = useTagStore();

  const resetForm = () => {
    setTitle("");
    setTitleError("");
    setSelectedColor(null);
    setSelectedColorError("");
  };

  const closeModal = useCallback(() => {
    setShowModal(false);
    modalRef.current?.close();
    resetForm();
  }, [setShowModal]);

  const openModal = useCallback(() => {
    const tag = getTagById(tagIdToEdit);
    setTitle(tag?.title || "");
    setSelectedColor(tag?.color || "");
    modalRef.current?.showModal();
  }, [getTagById, tagIdToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!title.trim()) {
      setTitleError("Name is required.");
      valid = false;
    } else if (!isValidLength(title, 25)) {
      setTitleError("Name cannot exceed 25 character limit.");
      valid = false;
    }

    if (!selectedColor) {
      setSelectedColorError("Please select a color for the tag.");
      valid = false;
    }

    if (!valid) return;

    await updateTag(tagIdToEdit, { title, color: selectedColor });
    closeModal();
  };

  useEffect(() => {
    if (showModal) {
      openModal();
    } else {
      closeModal();
    }
  }, [showModal, openModal, closeModal]);

  return (
    <dialog ref={modalRef} className="modal scrollbar-hide">
      <div className="modal-box p-12 font-inter w-96 min-w-[280px] h-[560px] max-w-2xl">
        <h1 className="text-3xl font-jersey mb-2">Edit tag</h1>

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
            leftLabel="Close"
            rightLabel="Save"
            closeModalFunc={closeModal}
          />
        </form>
      </div>
    </dialog>
  );
}
