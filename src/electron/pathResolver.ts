import path from 'path';
import { app } from 'electron';
import { isDev } from './utils.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

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
  if (process.env.NODE_ENV === 'development') {
    return require.resolve('@lightclients/kevlar/dist/rpc-bundle/start-rpc.js');
  } else {
    return path.join(
      process.resourcesPath,
      'app.asar.unpacked',
      'node_modules',
      '@lightclients',
      'kevlar',
      'dist',
      'rpc-bundle',
      'start-rpc.js'
    );
  }
}
