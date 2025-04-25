//exposes API to React component and prevents direct access from FE
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  // Task methods
  loadTasks: () => ipcRenderer.invoke("load-tasks"),
  saveTasks: async (data) => {
    // Create a clean, serializable copy
    const cleanData = {
      todo: JSON.parse(JSON.stringify(data.todo || [])),
      progress: JSON.parse(JSON.stringify(data.progress || [])),
      done: JSON.parse(JSON.stringify(data.done || []))
    };
    
    console.log('Renderer sending:', cleanData);
    return await ipcRenderer.send('save-tasks', cleanData);
  },

  // Other APIs you need
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),
});
