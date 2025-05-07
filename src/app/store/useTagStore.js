import { create } from "zustand";
import useDashboardStore from "./useDashboardStore";
import useTaskStore from "./useTaskStore";

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
        d.id === targetId ? { ...d, tags: [...(d.tags || []), tagData] } : d
      );

      await persistDashboards(updatedDashboards);

      const updatedDashboard = updatedDashboards.find((d) => d.id === targetId);
      set({ currentTags: updatedDashboard?.tags || [] });
    },

    //delete a tag from dashboard
    deleteDashboardTag: async (tagId) => {
      const dashboards = await loadDashboardsFromDisk();
      const targetId = useDashboardStore.getState().currentDashboardId;
      if (!targetId) return;
    
      // Remove tag from the dashboard
      const updatedDashboards = dashboards.map((dashboard) =>
        dashboard.id === targetId
          ? { ...dashboard, tags: (dashboard.tags || []).filter((tag) => tag.id !== tagId) }
          : dashboard
      );
    
      await persistDashboards(updatedDashboards);
    
      // Update currentTags in tag store
      const updatedDashboard = updatedDashboards.find((d) => d.id === targetId);
      set({ currentTags: updatedDashboard?.tags || [] });
    
      // Remove tag from tasks
      const taskStore = useTaskStore.getState();
      const cleanedColumns = Object.fromEntries(
        Object.entries(taskStore.columns).map(([columnId, tasks]) => [
          columnId,
          tasks.map((task) => ({
            ...task,
            tags: (task.tags || []).filter((tag) => tag.id !== tagId),
          })),
        ])
      );
    
      useTaskStore.setState({ columns: cleanedColumns });
      await taskStore.saveTasks(cleanedColumns);
    },
  }
});

export default useTagStore;
