import net from 'net';
import { fork, ChildProcess } from 'child_process';
import { BrowserWindow, Notification } from 'electron';
import { ipcWebContentsSend } from './utils.js';
import { getKevlarPath } from './pathResolver.js';

export default class KevlarHandler {
    kevlar: ChildProcess | null = null;
    logWindow: BrowserWindow;
    port: number;

    constructor(logWindow: BrowserWindow) {
        this.logWindow = logWindow;
        this.port = 8546;
    }

    async start(onStartCallback: () => void,onCloseCallback: () => void): Promise<void> {
        console.log('Starting Kevlar');

        const isPortInUse = (port: number): Promise<boolean> => {
            return new Promise((resolve) => {
                const tester = net.createConnection({ port }, () => {
                    resolve(true);
                    tester.end();
                });

                tester.on('error', () => {
                    resolve(false);
                });
            });
        };

        const portInUse = await isPortInUse(this.port);
        if (portInUse) {
            new Notification({
                title: 'Start Kevlar',
                body: `Port ${this.port} is already in use, try again in a minute`
            }).show();
            console.error(`Port ${this.port} is already in use`);
            return;
        }
        onStartCallback();

        this.kevlar = fork(getKevlarPath(), { silent: true });

        this.kevlar.stdout?.on('data', (data: any) => {
            const logMessage = data.toString();
            ipcWebContentsSend('logs', this.logWindow.webContents, { message: logMessage, level: 'info', timestamp: new Date().toISOString() });
        });

        this.kevlar.stderr?.on('data', (data: any) => {
            const logMessage = data.toString();
            ipcWebContentsSend('logs', this.logWindow.webContents, { message: logMessage, level: 'error', timestamp: new Date().toISOString() });
            console.error(logMessage);
        });

        this.kevlar.on('close', (code: number) => {
            console.log(`Kevlar process exited with code ${code}`);
            ipcWebContentsSend('logs', this.logWindow.webContents, { message: `Kevlar process exited with code ${code}`, level: 'info', timestamp: new Date().toISOString() });
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
