import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import useDashboardStore from "../store/useDashboardStore";
import useTaskStore from "../store/useTaskStore";
import { Plus } from "lucide-react";
import EditDashboardModal from "./modals/EditDashboardModal";
import AddNewDashboardModal from "./modals/AddNewDashboardModal";

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
  const [showModal, setShowModal] = useState(false);

  const handleDashboardChange = (dashboardId) => {
    setActiveDashboard(dashboardId);
    loadTasksByDashboardId(dashboardId);
  };
  useEffect(() => {
    initializeDashboards();
  }, []);

  useEffect(() => {
    window.electronAPI?.onContextMenuCommand(({ action, id }) => {
      if (action === "edit") {
        setDashboardToEdit(id);
        setShowModal(true);
      } else if (action === "delete") {
        handleDeleteDashboard(id);
      }
    });
  }, []);

  const buttonStyle =
    "px-4 py-2 rounded-t-2xl w-fit cursor-pointer font-oswald tracking-wide align-middle hover:bg-white transition-all";

  return (
    <div className="">
      {showModal && (
        <EditDashboardModal
          dashboardId={dashboardToEditId}
          dashboardTitle={
            dashboards.find((d) => d.id === dashboardToEditId)?.title || ""
          }
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <div className="w-full bg-gray-300 pt-10">
        {dashboards.map((d) => (
          <button
            key={d.id}
            onClick={() => handleDashboardChange(d.id)}
            className={`${buttonStyle} ${
              currentDashboardId === d.id ? "bg-white" : "bg-gray-200"
            }`}
            onContextMenu={(e) => {
              e.preventDefault();
              window.electronAPI?.showContextMenu(d.id);
            }}
          >
            {d.title}
          </button>
        ))}

        {dashboards.length < 3 && (
          <AddNewDashboardModal/>
        )}
      </div>

      {currentDashboardId && (
        <div className="px-3 pt-4 h-dvh">
          <Dashboard dashboardId={currentDashboardId} />
        </div>
      )}
    </div>
  );
}
