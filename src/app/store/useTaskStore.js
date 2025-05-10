import { create } from "zustand";
import useTagStore from "./useTagStore"; // or the correct path

const useTaskStore = create((set, get) => ({
  columns: {
    todo: [],
    progress: [],
    done: [],
  },
  storeDashboardId: null,
  storeDashboardTitle: null,

  addTask: (columnId, updates) => {
    const newTask = {
      id: Date.now().toString(),
      title: updates.title,
      text: updates.text,
      strike: false,
      isOpen: true,
      tags: updates.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      columns: {
        ...state.columns,
        [columnId]: [...state.columns[columnId], newTask],
      },
    }));

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
              strike: updates.strike ?? item.strike,
              isOpen: updates.isOpen ?? item.isOpen,
              tags: updates.tags ?? item.tags, // preserve existing tags
              updatedAt: new Date().toISOString(),
            };
          }
          return item;
        });
      });

      if (wasUpdated) {
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

      get().saveTasks(newColumns);
      return { columns: newColumns };
    });
  },

  deleteTask: (itemId) => {
    set((state) => {
      const newColumns = { ...state.columns };
      let wasDeleted = false;

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
        get().saveTasks(newColumns);
        return { columns: newColumns };
      }

      return state;
    });
  },

  saveTasks: async (newColumns) => {
    try {
      const state = get();
      const currentTags = useTagStore.getState().currentTags;
  
      const currentDashboard = {
        id: state.storeDashboardId,
        title: state.storeDashboardTitle,
        tags: currentTags, 
      };
  
      await window.electronAPI.saveTasks(
        currentDashboard,
        newColumns ?? state.columns
      );
    } catch (error) {
      console.error("Save failed:", error);
    }
  },
  loadTasksByDashboardId: async (id) => {
    const dashboards = await window.electronAPI?.loadTasks();
    const dashboard = dashboards?.find((d) => d.id === id);

    if (dashboard) {
      set({
        storeDashboardId: id,
        storeDashboardTitle: dashboard.title,
        columns: {
          todo: dashboard.todo || [],
          progress: dashboard.progress || [],
          done: dashboard.done || [],
        },
      });
    }
  },
}));

export default useTaskStore;
