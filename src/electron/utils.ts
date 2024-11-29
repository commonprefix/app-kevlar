import { WebContents } from "electron";

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
