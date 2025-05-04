import React, { useEffect } from "react";
import useDashboardStore from "../../store/useDashboardStore";
import ModalButtonGroup from "../ModalButtonGroup";

export default function DeleteDashboardModal({
  dashboardId,
  dashboardTitle,
  showModal,
  setShowModal,
}) {
  const { deleteDashboard } = useDashboardStore();
  const modalRef = React.useRef(null);

  const closeModal = () => {
    setShowModal(false);
    modalRef.current?.close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    deleteDashboard(dashboardId);
    closeModal();
  };
  useEffect(() => {
    if (showModal) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [showModal]);

  return (
    <>
      <dialog ref={modalRef} id="my_modal_2" className="modal scrollbar-hide">
        <div className="modal-box h-[300px] max-w-md p-12 font-inter">
          <h1 className="text-3xl font-jersey mb-2">Are you sure you want to delete</h1>
          <h2 className="text-3xl font-jersey mb-2 text-center">{dashboardTitle} </h2>
          <p className="text-center font-inter text-gray-600">You will lose all tasks in this dashboard.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-10" />
            <ModalButtonGroup
              leftLabel={"Close"}
              rightLabel={"Delete"}
              closeModalFunc={closeModal}
            />
          </form>
        </div>
      </dialog>
    </>
  );
}
