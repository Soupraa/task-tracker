const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { saveTasks, loadTasks, saveDashboards } = require("./fileSystem");

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 1000,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false,
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  const startURL = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../out/index.html")}`;

  mainWindow.loadURL(startURL);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle("load-tasks", async () => {
  return loadTasks();
});

ipcMain.on("save-tasks", (event, dashboardData, columnData) => {
  saveTasks(dashboardData, columnData);
});

ipcMain.on("save-dashboards", (event, dashboards) => {
  saveDashboards(dashboards);
});
