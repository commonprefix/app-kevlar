const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
  subscribeLogs: (callback) => {
    return ipcOn('logs', (logs) => {
      callback(logs);
    });
  },
} satisfies Window['electron']);

function ipcOn<Key extends keyof EventPayloadMapping> (
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}
