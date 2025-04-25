import { create } from "zustand";

const useTaskStore = create((set, get) => ({
  // Initial state
  columns: {
    todo: [],
    progress: [],
    done: [],
  },

  // Actions
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

      // Find and update the task in any column
      Object.keys(newColumns).forEach((columnId) => {
        newColumns[columnId] = newColumns[columnId].map((item) => {
          if (item.id === itemId) {
            wasUpdated = true;
            return {
              ...item,
              ...updates,
              updatedAt: new Date().toISOString(), // Add update timestamp
            };
          }
          return item;
        });
      });

      if (wasUpdated) {
        // Auto-save only if something changed
        window.electronAPI?.saveTasks(newColumns);
        return { columns: newColumns };
      }

      // Return unchanged state if no update happened
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
      window.electronAPI?.saveTasks(newColumns);

      return { columns: newColumns };
    });
  },

  saveTasks: async () => {
    try {
      await window.electronAPI.saveTasks(get().columns);
    } catch (error) {
      console.error("Save failed:", error);
    }
  },

  // Optional: Load tasks
  loadTasks: async () => {
    const tasks = await window.electronAPI?.loadTasks();
    console.log("Loaded", tasks);
    if (tasks)
      set({
        columns: {
          todo: tasks?.todo || [],
          progress: tasks?.progress || [],
          done: tasks?.done || [],
        },
      });
  },
}));

export default useTaskStore;
