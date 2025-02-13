import { Tray, nativeImage, BrowserWindow, app } from 'electron';
import path from 'path';
import { buildMenu } from './menu.js';
import KevlarHandler from './kevlar.js';
import { getAssetPath, getMetamaskPath } from './pathResolver.js';
import { shell } from 'electron';
import { isDev } from './utils.js';

export default class TrayCreator {
  trayInstance: Tray;
  icon_path: string;
  icon: any;
  isRunning: boolean = false;
  kevlar: KevlarHandler;
  logWindow: BrowserWindow;
  isOnMetamask: boolean = false;

  constructor(logWindow: BrowserWindow) {
    this.logWindow = logWindow;
    this.icon_path = path.join(getAssetPath(), "kevlar.png");
    this.icon = nativeImage.createFromPath(this.icon_path).resize({ width: 16, height: 16 });
    this.icon.setTemplateImage(true);
    this.kevlar = new KevlarHandler(logWindow);
    this.trayInstance = new Tray(this.icon);
    this.trayInstance.setToolTip('Kevlar Light Client');
    this.updateMenu();
  }

  private updateMenu() {
    const menu = buildMenu(
      () => this.handleStart(),
      () => this.handleStop(),
      () => this.handleLogs(),
      () => this.handleMetamask(),
      this.isRunning,
      this.isOnMetamask
    );
    this.trayInstance.setContextMenu(menu);
  }

  private handleStart() {
    this.kevlar.start(
      () => {
        this.isRunning = true;
        this.updateMenu();
      },
      () => {
        this.isRunning = false;
        this.updateMenu();
      }
    );
  }

  private handleStop() {
    this.isRunning = false;
    this.updateMenu();
    this.kevlar.stop();
  }

  private handleLogs() {
    this.logWindow.show();
    if (app.dock) {
      app.dock.show();
    }
  }

  private async handleMetamask() {
    if (!isDev()) {
      shell.openExternal('http://localhost:8080');
    } else {
      shell.openExternal(getMetamaskPath());
    }
  }

  addedToMetamask = () => {
    this.isOnMetamask = true;
    this.updateMenu();
  }
}
