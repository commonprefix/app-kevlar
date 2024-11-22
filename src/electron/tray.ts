import { Tray, nativeImage } from 'electron';
import path from 'path';
import { buildMenu } from './menu.js';
import KevlarHandler from './kevlar.js';
import { getAssetPath } from './pathResolver.js';

export default class TrayCreator {
  trayInstance: Tray;
  icon_path: string;
  icon: any;
  isRunning: boolean = false;
  kevlar: KevlarHandler;

  constructor() {
    this.icon_path = path.join(getAssetPath(), "kevlar.png");
    this.icon = nativeImage.createFromPath(this.icon_path).resize({ width: 16, height: 16 });
    this.icon.setTemplateImage(true);
    this.kevlar = new KevlarHandler();
    this.trayInstance = new Tray(this.icon);
    this.trayInstance.setToolTip('Kevlar Light Client');
    this.updateMenu();
  }

  private updateMenu() {
    const menu = buildMenu(
      () => this.handleStart(),
      () => this.handleStop(),
      () => this.handleLogs(),
      this.isRunning
    );
    this.trayInstance.setContextMenu(menu);
  }

  private handleStart() {
    this.isRunning = true;
    this.updateMenu();
    this.kevlar.start();
  }

  private handleStop() {
    this.isRunning = false;
    this.updateMenu();
    this.kevlar.stop();
  }

  private handleLogs() {
  }
}
