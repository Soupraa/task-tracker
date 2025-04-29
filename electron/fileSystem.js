const { app } = require("electron");
const fs = require("fs");
const path = require("path");

const DEFAULT_DATA = [
  {
    id: "defaultId",
    title: "dashboard",
    todo: [
      {
        id: "welcome",
        title: "Welcome to OnTask",
        text: "Start creating tasks, stay locked in, happy tasking :)",
      },
    ],
    progress: [],
    done: [],
  },
];
const getSavePath = () => {
  const userDataPath = app.getPath("userData");
  // Create app directory if it doesn't exist
  if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath, { recursive: true });
  }
  return path.join(userDataPath, "app-data.json");
};

const saveTasks = (dashboardData, columnData) => {
  try {
    // 1. Load existing data (or initialize if empty)
    let allDashboards = [];
    if (fs.existsSync(getSavePath())) {
      const fileData = fs.readFileSync(getSavePath(), "utf8");
      allDashboards = JSON.parse(fileData);
      if (!Array.isArray(allDashboards)) {
        throw new Error("Invalid data format - expected array");
      }
    }

    // 2. Validate input structure
    if (
      !columnData ||
      !Array.isArray(columnData.todo) ||
      !Array.isArray(columnData.progress) ||
      !Array.isArray(columnData.done)
    ) {
      throw new Error("Invalid data structure provided");
    }

    // 3. Find and update specific dashboard
    const dashboardIndex = allDashboards.findIndex(
      (d) => d.id === dashboardData.id
    );
    const updatedDashboard = {
      id: dashboardData.id,
      title: dashboardData.title,
      todo: [...columnData.todo],
      progress: [...columnData.progress],
      done: [...columnData.done],
      updatedAt: new Date().toISOString(),
    };

    if (dashboardIndex >= 0) {
      // Update existing dashboard
      allDashboards[dashboardIndex] = updatedDashboard;
    } else {
      // Add new dashboard
      allDashboards.push(updatedDashboard);
    }

    // 4. Save the complete data back to file
    fs.writeFileSync(getSavePath(), JSON.stringify(allDashboards, null, 2));
    console.log(`Dashboard ${dashboardData.id} saved successfully`);
    return true;
  } catch (error) {
    console.error("Save failed:", error);
    return false;
  }
};

//get the all dashboards tasks
const loadTasks = () => {
  try {
    // Check if file exists first
    if (!fs.existsSync(getSavePath())) {
      console.log("No tasks file found, returning defaults");
      return DEFAULT_DATA;
    }

    const data = fs.readFileSync(getSavePath(), "utf8");
    const parsed = JSON.parse(data);

    // strict validation of parsed data, if not expected return default
    if (
      Array.isArray(parsed) &&
      parsed.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          typeof item.id === "string" &&
          typeof item.title === "string" &&
          Array.isArray(item.todo) &&
          Array.isArray(item.progress) &&
          Array.isArray(item.done)
      )
    ) {
      return parsed;
    }
    console.warn(
      "Invalid data structure or dashboard not found, returning defaults"
    );
    return DEFAULT_DATA;
  } catch (error) {
    console.error("Error loading tasks:", error);
    return DEFAULT_DATA;
  }
};

const saveDashboards = (dashboards) => {
  fs.writeFileSync(getSavePath(), JSON.stringify(dashboards, null, 2));
};
// Use module.exports for CommonJS
module.exports = {
  saveTasks,
  loadTasks,
  saveDashboards,
};
