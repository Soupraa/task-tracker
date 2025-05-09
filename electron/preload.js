//exposes API to React component and prevents direct access from FE
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  // Task methods
  loadTasks: () => ipcRenderer.invoke("load-tasks"),
  saveTasks: async (dashboardData, columnData) => {
    const cleanData = {
      todo: JSON.parse(JSON.stringify(columnData.todo || [])),
      progress: JSON.parse(JSON.stringify(columnData.progress || [])),
      done: JSON.parse(JSON.stringify(columnData.done || [])),
    };
    return await ipcRenderer.send("save-tasks", dashboardData, cleanData);
  },
  saveDashboards: async (dashboards) => {
    return await ipcRenderer.send("save-dashboards", dashboards);
  },
  showContextMenu: (event, dashboardId) =>
{    ipcRenderer.send("show-dashboard-context-menu", event, dashboardId);
},
  onContextMenuCommand: (callback) =>
    ipcRenderer.on("context-menu-command", (event, payload) =>
      callback(payload)
    ),
  // Other APIs you need
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),
});
