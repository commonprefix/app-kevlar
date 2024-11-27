import { fork, ChildProcess } from 'child_process';
import { BrowserWindow } from 'electron';
import { ipcWebContentsSend } from './utils.js';
import { getKevlarPath } from './pathResolver.js';

export default class KevlarHandler {
    kevlar: ChildProcess | null = null;
    logWindow: BrowserWindow;

    constructor(logWindow: BrowserWindow) {
        this.logWindow = logWindow;
    }

    async start(onCloseCallback: () => void): Promise<void> {
        console.log('Starting Kevlar');
        this.kevlar = fork(getKevlarPath(), { silent: true });

        this.kevlar.stdout?.on('data', (data: any) => {
            const logMessage = data.toString();
            ipcWebContentsSend('logs', this.logWindow.webContents, logMessage);
        });

        this.kevlar.stderr?.on('data', (data: any) => {
            const logMessage = data.toString();
            console.error(logMessage);
        });

        this.kevlar.on('close', (code: number) => {
            console.log(`Kevlar process exited with code ${code}`);
            ipcWebContentsSend('logs', this.logWindow.webContents, `Kevlar process exited with code ${code}`);
            this.kevlar = null;
            onCloseCallback();
        });
    }

    stop(): void {
        if (this.kevlar) {
            console.log('Stopping Kevlar');
            this.kevlar.kill();
            this.kevlar = null;
        } else {
            console.log('Kevlar is not running');
        }
    }
}
