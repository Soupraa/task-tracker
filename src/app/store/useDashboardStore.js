import { create } from "zustand";

const useDashboardStore = create((set, get) => ({
  currentDashboardId: null, // Tracks which dashboard is being viewed
  dashboards: [], // Stores all dashboards data
  dashboardToEditId: null,
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
        console.log("SAVING DASHBOARDS");
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
  editExistingDashboard: async (dashboardId, newTitle) => {
    const data = await window.electronAPI?.loadTasks();
    if (!data) return;

    const updatedDashboards = data.map((d) => {
      if (d.id === dashboardId) {
        return { ...d, title: newTitle };
      }
      return d;
    });

    set({ dashboards: updatedDashboards });
    get().saveDashboards();
  },
  setDashboardToEdit: (dashboardId) => {
    console.log(dashboardId);
    set({ dashboardToEditId: dashboardId });
  },
  addNewDashboard: async (dashboardName) => {
    const newDashboard = {
      id: Date.now().toString(),
      title: dashboardName,
      todo: [],
      progress: [],
      done: [],
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    const data = await window.electronAPI?.loadTasks();
    if (!data) return;

    data.push(newDashboard);
    set({ dashboards: data });
    get().saveDashboards();
  },

  deleteDashboard: async (dashboardId) => {
    const data = await window.electronAPI?.loadTasks();
    if (!data) return;

    const newDashboards = data.filter(d => d.id !== dashboardId);
    set({dashboards: newDashboards});
    get().saveDashboards();
  },
}));

export default useDashboardStore;
