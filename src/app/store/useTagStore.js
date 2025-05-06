import { create } from "zustand";

const useTagStore = create((set, get) => ({
  currentTags: [], 
  //initalise the tags array for current dashboard in view
  getDashboardTags: async (dashboardId) => {
    const data = await window.electronAPI?.loadTasks();
    if (!data) return;
    const currentDashboard = data.filter(d => d.id === dashboardId);
    set({currentTags: currentDashboard[0].tags});
    return;
  },

}));

export default useTagStore;
