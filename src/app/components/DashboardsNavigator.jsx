import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import useDashboardStore from "../store/useDashboardStore";
import useTaskStore from "../store/useTaskStore";
import { Plus } from "lucide-react";

export default function DashboardsNavigator() {
  const {
    initializeDashboards,
    dashboards,
    currentDashboardId,
    setActiveDashboard,
    saveDashboards
  } = useDashboardStore();
  const { loadTasksByDashboardId } = useTaskStore();

  const handleDashboardChange = (dashboardId) => {
    setActiveDashboard(dashboardId);
    loadTasksByDashboardId(dashboardId);
  };

  useEffect(() => {
    initializeDashboards();

  }, []);
  const buttonStyle =
    "px-4 py-2 rounded-t-2xl w-fit cursor-pointer font-oswald tracking-wide align-middle hover:bg-white transition-all";
  return (
    <div className="">
      <div className="w-full bg-gray-300 pt-10">
        {dashboards.map((d) => (
          <button
            key={d.id}
            onClick={() => handleDashboardChange(d.id)}
            className={`${buttonStyle} ${
              currentDashboardId === d.id ? "bg-white" : "bg-gray-200"
            }`}
          >
            {d.title}
          </button>
        ))}
        {dashboards.length < 3 && (
          <div className="tooltip" data-tip="Add new dashboard">
            <button
              onClick={() => console.log("clicked")}
              className={buttonStyle}
            >
              <Plus />
            </button>
          </div>
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
