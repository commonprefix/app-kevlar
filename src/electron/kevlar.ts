import { spawn, ChildProcess } from 'child_process';
import { BrowserWindow } from 'electron';
import { ipcWebContentsSend } from './utils.js';

const kevlarPath = "/Users/sofikitis/workspace/open-source/kevlar";
const command = "npm run rpc-proxy";

export default class KevlarHandler {
    kevlar: ChildProcess | null = null;
    logWindow: BrowserWindow;

    constructor(logWindow: BrowserWindow) {
        this.logWindow = logWindow;
    }

    start(): void {
        console.log('Starting Kevlar');
        this.kevlar = spawn(command, { cwd: kevlarPath, shell: true });

        this.kevlar.stdout?.on('data', (data: any) => {
            const logMessage = data.toString();
            ipcWebContentsSend('logs', this.logWindow.webContents, logMessage);
        });

        this.kevlar.stderr?.on('data', (data: any) => {
            const logMessage = data.toString();
            ipcWebContentsSend('logs', this.logWindow.webContents, logMessage);
        });

        this.kevlar.on('close', (code: number) => {
            console.log(`Kevlar process exited with code ${code}`);
            this.kevlar = null;
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