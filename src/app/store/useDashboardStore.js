import { create } from "zustand";

const useDashboardStore = create((set, get) => {
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
    currentDashboardId: null,
    dashboards: [],
    dashboardToEditId: null,

    initializeDashboards: async () => {
      const data = await loadDashboardsFromDisk();
      if (data.length === 0) return false;

      set({
        currentDashboardId: data[0].id,
        dashboards: data.map((d) => ({
          id: d.id,
          title: d.title,
          tags: d.tags,
          todo: d.todo,
          progress: d.progress,
          done: d.done,
          updatedAt: d.updatedAt,
        })),
      });

      console.log("SAVING DASHBOARDS");
      await persistDashboards(get().dashboards);
      return true;
    },

    setActiveDashboard: (dashboardId) => {
      set({ currentDashboardId: dashboardId });
    },

    saveDashboards: async () => {
      await persistDashboards(get().dashboards);
    },

    editExistingDashboard: async (dashboardId, newTitle) => {
      const dashboards = await loadDashboardsFromDisk();

      const updated = dashboards.map((d) =>
        d.id === dashboardId ? { ...d, title: newTitle } : d
      );

      set({ dashboards: updated });
      await persistDashboards(updated);
    },

    setDashboardToEdit: (dashboardId) => {
      set({ dashboardToEditId: dashboardId });
    },

    addNewDashboard: async (dashboardName) => {
      const dashboards = await loadDashboardsFromDisk();

      const newDashboard = {
        id: Date.now().toString(),
        title: dashboardName,
        tags: [],
        todo: [],
        progress: [],
        done: [],
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      const updated = [...dashboards, newDashboard];
      set({ dashboards: updated });
      await persistDashboards(updated);
    },

    deleteDashboard: async (dashboardId) => {
      const dashboards = await loadDashboardsFromDisk();

      const filtered = dashboards.filter((d) => d.id !== dashboardId);
      set({ dashboards: filtered });
      await persistDashboards(filtered);
    },
  };
});

export default useDashboardStore;
