import { BrowserWindow, Notification, utilityProcess, UtilityProcess } from 'electron';
import { ipcWebContentsSend, isPortInUse, formatDate } from './utils.js';
import { getKevlarPath } from './pathResolver.js';

export default class KevlarHandler {
    kevlar: UtilityProcess | null = null;
    logWindow: BrowserWindow;
    port: number;

    constructor(logWindow: BrowserWindow) {
        this.logWindow = logWindow;
        this.port = 8546;
    }

    async start(onStartCallback: () => void, onCloseCallback: () => void): Promise<void> {
        console.log('Starting Kevlar');

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

        this.kevlar = utilityProcess.fork(getKevlarPath(), [], { stdio: 'pipe' });

        this.kevlar.stdout?.on('data', (data: any) => {
            const logMessage = data.toString();

            ipcWebContentsSend('logs', this.logWindow.webContents,
                { message: logMessage, level: 'INFO', timestamp: formatDate(new Date()) });
        });

        this.kevlar.stderr?.on('data', (data: any) => {
            const logMessage = data.toString();
            ipcWebContentsSend('logs', this.logWindow.webContents,
                { message: logMessage, level: 'ERROR', timestamp: formatDate(new Date()) });
            console.error(logMessage);
        });

        this.kevlar.on('exit', (code: number) => {
            console.log(`Kevlar process exited with code ${code}`);
            ipcWebContentsSend('logs', this.logWindow.webContents,
                {
                    message: `Kevlar process exited with code ${code}`,
                    level: 'EXIT', timestamp: formatDate(new Date())
                });
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
