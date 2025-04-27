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
          dashboards: data.map((d) => ({
            id: d.id,
            title: d.title,
            todo: d.todo,
            progress: d.progress,
            done: d.done,
            updatedAt: d.updatedAt,
          })),
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error initializing dashboards:", error);
      return false;
    }
  },
}));

export default useDashboardStore;
