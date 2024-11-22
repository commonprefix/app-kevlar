import { app, BrowserWindow } from "electron";
import TrayCreator from "./tray.js";
import { isDev } from "./utils.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";

//Menu.setApplicationMenu(null);

app.on("ready", () => {
  // init log window hidden
  const logWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    }
  });
  if (isDev()) {
    logWindow.loadURL('http://localhost:3000');
  } else {
    logWindow.loadFile(getUIPath());
  }
  logWindow.hide();
  if (app.dock) {
    app.dock.hide();
  }
  handleCloseEvent(logWindow);

  new TrayCreator(logWindow);
});

function handleCloseEvent(logWindow: BrowserWindow) {
  let willClose = false;

  logWindow.on('close', (e) => {
    if (willClose) {
      return;
    }
    e.preventDefault();
    logWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });
  
  app.on('before-quit', () => {
    willClose = true;
  });

  logWindow.on('show', () => {
    willClose = false;
  });
}

