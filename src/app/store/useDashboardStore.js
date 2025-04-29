import { create } from "zustand";

const useDashboardStore = create((set, get) => ({
  currentDashboardId: null, // Tracks which dashboard is being viewed
  dashboards: [], // Stores all dashboards data
  //initalise all dashboards
  initializeDashboards: async () => {
    try {
      const data = await window.electronAPI?.loadTasks();
      if (data && Array.isArray(data)) {
        set({
          currentDashboardId: data[0].id,
          dashboards: data.map((d) => ({
            id: d.id,
            title: d.title,
            todo: d.todo,
            progress: d.progress,
            done: d.done,
            updatedAt: d.updatedAt,
          })),
        });
        console.log("SAVING DASHBORDS")
        get().saveDashboards();

        return true;
      }
      return false;
    } catch (error) {
      console.error("Error initializing dashboards:", error);
      return false;
    }
  },
  setActiveDashboard: (dashboardId) => {
    set({ currentDashboardId: dashboardId });
  },
  saveDashboards: async () => {
    await window.electronAPI.saveDashboards(get().dashboards);
  },
}));

export default useDashboardStore;
