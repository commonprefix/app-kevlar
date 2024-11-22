import { app, Menu } from "electron";
import TrayCreator from "./tray.js";

Menu.setApplicationMenu(null);

app.on("ready", () => {
  new TrayCreator();
});

