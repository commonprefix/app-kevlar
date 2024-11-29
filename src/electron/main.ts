import { app, BrowserWindow } from "electron";
import TrayCreator from "./tray.js";
import { isDev } from "./utils.js";
import { getPreloadPath, getLoggingPath } from "./pathResolver.js";
import { startMetamaskServer } from "./metamask.js";

//Menu.setApplicationMenu(null);

app.on("ready", () => {
  // init log window hidden
  const logWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    }
  });
  if (isDev()) {
    logWindow.loadURL('http://localhost:3000/src/ui/pages/logging/');
  } else {
    logWindow.loadFile(getLoggingPath());
  }
  logWindow.hide();
  if (app.dock) {
    app.dock.hide();
  }
  handleCloseEvent(logWindow);

  const tray = new TrayCreator(logWindow);

  startMetamaskServer(tray.addedToMetamask);
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

