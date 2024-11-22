import { app, BrowserWindow } from "electron";
import { isDev } from "./utils.js";
import { getUIPath } from "./pathResolver.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({});

  if (isDev()) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadFile(getUIPath());
  }
});
