import { spawn, ChildProcess } from 'child_process';
import { BrowserWindow } from 'electron';

const kevlarPath = "/Users/sofikitis/workspace/open-source/kevlar";
const command = "npm run rpc-proxy";

export default class KevlarHandler {
    kevlar: ChildProcess | null = null;
    logs: string[] = [];
    logWindow: BrowserWindow | null = null;

    start(): void {
        console.log('Starting Kevlar');
        this.logs = [];
        this.kevlar = spawn(command, { cwd: kevlarPath, shell: true });

        this.kevlar.stdout?.on('data', (data: any) => {
            const logMessage = data.toString();
            console.log(logMessage);
            this.logs.push(logMessage);
        });

        this.kevlar.stderr?.on('data', (data: any) => {
            const logMessage = data.toString();
            console.error(logMessage);
            this.logs.push(logMessage);
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