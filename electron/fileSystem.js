// electron/fileSystem.js
const { app } = require("electron");
const fs = require("fs");
const path = require("path");

const DEFAULT_DATA = {
  todo: [
    {
      id: "task1",
      text: "Design Homepage",
      title: "A LOOOnnnGGGGG TiTTTTTTLLLLLEEEE",
    },
    {
      id: "task2",
      text: "Implement API",
      title:
        "TiTTTTTTLLLLLEEEETiTTTTTTLL LLLEEEETiTTTTTTLLLLLEE  EETiTTTTTTLLLLLEEEETiT  TTTTTLLLLLEEE  TiTTTTTTLLLLLEEEE",
    },
  ],
  progress: [
    {
      id: "task3",
      text: "Build and maintain full stack web applications for new innovative projects. Collaborate closely with cross-functional teams, including designers, developers and product managers to create high quality web solutions. Ensure applications are accessible, performant, and responsive across devices, while applying best practices in web development.",
      title: "TITLE",
    },
  ],
  done: [{ id: "task4", text: "Setup CI/CD Pipeline", title: "TITLE" }],
};
const getSavePath = () => {
  const userDataPath = app.getPath("userData");
  // Create app directory if it doesn't exist
  if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath, { recursive: true });
  }
  return path.join(userDataPath, "tasks.json");

//   return path.join('data/data.json', "tasks.json");
};

const saveTasks = (data) => {
  console.log(data);
  try {
    let sData = JSON.stringify(data);

    fs.writeFileSync(getSavePath(), sData);
    console.log("data saved");
    return true;
  } catch (error) {
    // Fallback to empty data if corrupted
    // const fallback = JSON.stringify({ todo: [], progress: [], done: [] });
    // fs.writeFileSync(getSavePath(), fallback);
    console.error("Save failed, reset to empty:", error);
    return false;
  }

};

const loadTasks = () => {
  try {
    // Check if file exists first
    if (!fs.existsSync(getSavePath())) {
      console.log("No tasks file found, returning defaults");
      return DEFAULT_DATA;
    }

    const data = fs.readFileSync(getSavePath(), "utf8");
    const parsed = JSON.parse(data);
    console.log(parsed);
    // Validate the loaded data structure
    if (!parsed.todo || !parsed.progress || !parsed.done) {
      console.warn("Invalid data structure, returning defaults");
      return DEFAULT_DATA;
    }

    return parsed;
  } catch (error) {
    console.error("Error loading tasks:", error);
    return DEFAULT_DATA;
  }
};

// Use module.exports for CommonJS
module.exports = {
  saveTasks,
  loadTasks,
};
