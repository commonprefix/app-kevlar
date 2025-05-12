import { WebContents } from "electron";
import net from 'net';

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development'
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key]
) {
  webContents.send(key, payload);
}

export function isPortInUse(port: number): Promise<boolean> {
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

export function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
};
