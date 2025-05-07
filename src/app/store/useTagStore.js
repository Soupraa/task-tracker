import { create } from "zustand";

const useTagStore = create((set) => {
  // Helpers
  const loadDashboardsFromDisk = async () => {
    try {
      const data = await window.electronAPI?.loadTasks();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Failed to load dashboards:", error);
      return [];
    }
  };

  const persistDashboards = async (dashboards) => {
    await window.electronAPI?.saveDashboards(dashboards);
  };

  return {
    currentTags: [],

    // Initialize currentTags based on a dashboard's ID
    getDashboardTags: async (dashboardId) => {
      const dashboards = await loadDashboardsFromDisk();
      const dashboard = dashboards.find((d) => d.id === dashboardId);
      if (dashboard) {
        set({ currentTags: dashboard.tags || [] });
      }
    },

    // Add a tag to a specific dashboard
    addNewDashboardTag: async (dashboardId, tagData) => {
      const dashboards = await loadDashboardsFromDisk();
      const targetId = dashboardId || window.currentDashboardId;
      if (!targetId) return;

      const updatedDashboards = dashboards.map((d) =>
        d.id === targetId
          ? { ...d, tags: [...(d.tags || []), tagData] }
          : d
      );

      await persistDashboards(updatedDashboards);

      const updatedDashboard = updatedDashboards.find((d) => d.id === targetId);
      set({ currentTags: updatedDashboard?.tags || [] });
    },
  };
});

export default useTagStore;
