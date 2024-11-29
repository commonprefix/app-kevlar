import { Menu, MenuItemConstructorOptions } from 'electron';

export function buildMenu(
  onStart: () => void,
  onStop: () => void,
  onLogs: () => void,
  onAddToMetamask: () => void,
  isRunning: boolean,
  isOnMetamask: boolean
): Menu {
  const template: MenuItemConstructorOptions[] = [
    {
      label: isRunning ? '⚡ Kevlar Running' : '🔌 Kevlar Stopped',
      enabled: false
    },
    {
      label: 'Add to Metamask',
      enabled: !isOnMetamask && isRunning,
      click: onAddToMetamask
    },
    { type: 'separator' },
    {
      label: 'Start Kevlar',
      enabled: !isRunning,
      click: onStart
    },
    {
      label: 'Logs',
      click: onLogs
    },
    {
      label: 'Stop Kevlar',
      enabled: isRunning,
      click: onStop
    },
    { type: 'separator' },
    {
      label: 'Quit',
      role: 'quit'
    }
  ];

  return Menu.buildFromTemplate(template);
}
