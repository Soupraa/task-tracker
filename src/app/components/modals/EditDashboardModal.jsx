import React, { useEffect, useState } from "react";
import useDashboardStore from "../../store/useDashboardStore";
import ModalButtonGroup from "../ModalButtonGroup";

export default function EditDashboardModal({
  dashboardId,
  dashboardTitle,
  showModal,
  setShowModal,
}) {
  const { editExistingDashboard } = useDashboardStore();
  const modalRef = React.useRef(null);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  const closeModal = () => {
    setShowModal(false);
    modalRef.current?.close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    if (!title.trim()) {
      setTitleError("Name is required.");
      return;
    }
    console.log(title, dashboardId);
    editExistingDashboard(dashboardId, title);
    closeModal();
  };
  useEffect(() => {
    if (showModal) {
      setTitle(dashboardTitle || "");
      setTitleError("");
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [showModal, dashboardTitle]);

  return (
    <>
      <dialog ref={modalRef} id="my_modal_2" className="modal scrollbar-hide">
        <div className="modal-box h-[380px] max-w-md p-12 font-inter">
          <h1 className="text-3xl font-jersey mb-2">Update Dashboard</h1>
          <form onSubmit={handleSubmit}>
            <label className="text-sm font-semibold tracking-wide">Name</label>
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
            <div className="mb-10" />
            <ModalButtonGroup
              leftLabel={"Close"}
              rightLabel={"Update"}
              closeModalFunc={closeModal}
            />
          </form>
        </div>
      </dialog>
    </>
  );
}
