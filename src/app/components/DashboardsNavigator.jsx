import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import useDashboardStore from "../store/useDashboardStore";
import useTaskStore from "../store/useTaskStore";
import EditDashboardModal from "./modals/EditDashboardModal";
import AddNewDashboardModal from "./modals/AddNewDashboardModal";
import DeleteDashboardModal from "./modals/DeleteDashboardModal";

export default function DashboardsNavigator() {
  const {
    initializeDashboards,
    dashboards,
    currentDashboardId,
    setActiveDashboard,
    setDashboardToEdit,
    dashboardToEditId,
  } = useDashboardStore();
  const { loadTasksByDashboardId } = useTaskStore();
  const [showEditDashboardModal, setShowEditDashboardModal] = useState(false);
  const [showDeleteDashboardModal, setShowDeleteDashboardModal] =
    useState(false);

  const handleDashboardChange = (dashboardId) => {
    setActiveDashboard(dashboardId);
    loadTasksByDashboardId(dashboardId);
  };
  useEffect(() => {
    initializeDashboards();
  }, []);

  useEffect(() => {
    window.electronAPI?.onContextMenuCommand(({ action, id }) => {
      setDashboardToEdit(id);
      if (action === "edit") {
        setShowEditDashboardModal(true);
      } else if (action === "delete") {
        setShowDeleteDashboardModal(true);
      }
    });
  }, []);

  const buttonStyle =
    "px-4 py-2 rounded-t-2xl w-fit cursor-pointer font-oswald tracking-wide align-middle hover:bg-white transition-all";
  return (
    <div className="">
      {showEditDashboardModal && (
        <EditDashboardModal
          dashboardId={dashboardToEditId}
          dashboardTitle={
            dashboards.find((d) => d.id === dashboardToEditId)?.title || ""
          }
          showModal={showEditDashboardModal}
          setShowModal={setShowEditDashboardModal}
        />
      )}
      {showDeleteDashboardModal && (
        <DeleteDashboardModal
          dashboardId={dashboardToEditId}
          dashboardTitle={
            dashboards.find((d) => d.id === dashboardToEditId)?.title || ""
          }
          showModal={showDeleteDashboardModal}
          setShowModal={setShowDeleteDashboardModal}
        />
      )}
      <div className="w-full bg-gray-300">
        <h1 className="font-jersey px-2 text-xl py-1 tracking-wide">
          OnTrack.
        </h1>

        <div className="flex no-scrollbar">
          {dashboards.map((d) => (
            <button
              title="right click to edit"
              key={d.id}
              onClick={() => handleDashboardChange(d.id)}
              onContextMenu={(e) => {
                e.preventDefault();
                window.electronAPI?.showContextMenu(d.id);
              }}
              className={`${buttonStyle} min-w-0 shrink px-2 py-1 truncate ${
                currentDashboardId === d.id ? "bg-white" : "bg-gray-200"
              }`}
            >
              {d.title}
            </button>
          ))}

          {dashboards.length < 6 && <AddNewDashboardModal type="topbar"/>}
        </div>
      </div>

      {currentDashboardId && dashboards.length > 0 && (
        <div className="h-dvh">
          <Dashboard dashboardId={currentDashboardId} />
        </div>
      )}
      {dashboards.length === 0 && <AddNewDashboardModal type="dashboard"/>}
    </div>
  );
}
