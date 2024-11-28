import path from 'path';
import { app } from 'electron';
import { isDev } from './utils.js';

export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? '.' : '..',
    'dist-electron/preload.cjs'
  )
}

export function getLoggingPath() {
  const devPath = 'http://localhost:3000/src/ui/pages/logging/';
  const prodPath = path.join(app.getAppPath(), 'dist-react/src/ui/pages/logging/index.html');
  return isDev() ? devPath : prodPath;
}

export function getMetamaskPath() {
  const devPath = 'http://localhost:3000/src/ui/pages/metamask/';
  const prodPath = path.join(app.getAppPath(), 'dist-react/src/ui/pages/metamask/index.html');
  return isDev() ? devPath : prodPath;
}

export function getAssetPath() {
  return path.join(app.getAppPath(), isDev() ? '.' : '..', 'src/assets');
}

export function getKevlarPath() {
  return path.join(app.getAppPath(), isDev() ? '.' : '..', 'dist-electron/kevlar/start-rpc.js');
}
