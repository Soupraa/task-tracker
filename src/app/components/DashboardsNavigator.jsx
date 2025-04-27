import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import useDashboardStore from "../store/useDashboardStore";
import useTaskStore from "../store/useTaskStore";

export default function DashboardsNavigator() {
  const [activeDashboard, setActiveDashboard] = useState("1");
  const { initializeDashboards, dashboards, currentDashboardId } = useDashboardStore();
  const { loadTasksByDashboardId } = useTaskStore();

  const handleDashboardChange = (dashboardId) => {
    setActiveDashboard(dashboardId);
    loadTasksByDashboardId(dashboardId);
  };

  useEffect(() => {
    initializeDashboards();
  }, []);
  return (
    <div className="p-16">
      {dashboards.map((d) => (
        <button
          key={d.id}
          onClick={() => handleDashboardChange(d.id)}
          className={`px-4 py-2 rounded ${
            currentDashboardId === d.id
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          {d.title}
        </button>
      ))}
      {activeDashboard && (
        <>
          <Dashboard dashboardId={activeDashboard} />
        </>
      )}
    </div>
  );
}
