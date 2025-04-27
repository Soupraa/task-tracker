//exposes API to React component and prevents direct access from FE
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  // Task methods
  loadTasks: () => ipcRenderer.invoke("load-tasks"),
  saveTasks: async (dashboardData, columnData) => {
    console.log("in preload", dashboardData, columnData);
    // Create a clean, serializable copy
    const cleanData = {
      todo: JSON.parse(JSON.stringify(columnData.todo || [])),
      progress: JSON.parse(JSON.stringify(columnData.progress || [])),
      done: JSON.parse(JSON.stringify(columnData.done || [])),
    };

    console.log("Renderer sending:", cleanData);
    return await ipcRenderer.send("save-tasks", dashboardData, cleanData);
  },

  // Other APIs you need
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),
});
