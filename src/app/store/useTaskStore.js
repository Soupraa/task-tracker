import { create } from "zustand";

const useTaskStore = create((set, get) => ({
  columns: {
    todo: [],
    progress: [],
    done: [],
  },
  storeDashboardId: null,
  storeDashboardTitle: null,

  addTask: (columnId, taskTitle, taskText) => {
    console.log(columnId);
    const newTask = {
      id: Date.now().toString(),
      title: taskTitle,
      text: taskText,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      columns: {
        ...state.columns,
        [columnId]: [...state.columns[columnId], newTask],
      },
    }));

    // Auto-save
    get().saveTasks();
  },
  updateTask: (itemId, updates) => {
    set((state) => {
      const newColumns = { ...state.columns };
      let wasUpdated = false;

      Object.keys(newColumns).forEach((columnId) => {
        newColumns[columnId] = newColumns[columnId].map((item) => {
          if (item.id === itemId) {
            wasUpdated = true;
            return {
              ...item,
              ...updates,
              updatedAt: new Date().toISOString(),
            };
          }
          return item;
        });
      });

      if (wasUpdated) {
        // Auto-save only if something changed
        get().saveTasks(newColumns);
        return { columns: newColumns };
      }
      return state;
    });
  },
  moveTask: (itemId, targetColumn) => {
    set((state) => {
      const newColumns = { ...state.columns };
      // Remove from current column
      Object.keys(newColumns).forEach((columnId) => {
        newColumns[columnId] = newColumns[columnId].filter(
          (item) => item.id !== itemId
        );
      });

      // Find and add to target column
      const allItems = Object.values(state.columns).flat();
      const movedItem = allItems.find((item) => item.id === itemId);
      if (movedItem) {
        newColumns[targetColumn] = [...newColumns[targetColumn], movedItem];
      }
      // Auto-save
      get().saveTasks(newColumns);

      return { columns: newColumns };
    });
  },
  deleteTask: (itemId) => {
    set((state) => {
      const newColumns = { ...state.columns };
      let wasDeleted = false;

      // Remove task from all columns
      Object.keys(newColumns).forEach((columnId) => {
        const originalLength = newColumns[columnId].length;
        newColumns[columnId] = newColumns[columnId].filter(
          (item) => item.id !== itemId
        );

        if (newColumns[columnId].length !== originalLength) {
          wasDeleted = true;
        }
      });

      if (wasDeleted) {
        // Auto-save only if something was actually deleted
        get().saveTasks(newColumns);
        return { columns: newColumns };
      }

      return state;
    });
  },
  saveTasks: async (newColumns) => {
    try {
      await window.electronAPI.saveTasks(
        { id: get().storeDashboardId, title: get().storeDashboardTitle },
        newColumns ? newColumns : get().columns
      );
    } catch (error) {
      console.error("Save failed:", error);
    }
  },
  loadTasksByDashboardId: async (id) => {
    const dashboards = await window.electronAPI?.loadTasks();
    const dashboard = dashboards?.find((d) => d.id === id);
    if (dashboard)
      set({
        storeDashboardId: id,
        storeDashboardTitle: dashboard.title,
        columns: {
          todo: dashboard?.todo || [],
          progress: dashboard?.progress || [],
          done: dashboard?.done || [],
        },
      });
  },
}));

export default useTaskStore;
