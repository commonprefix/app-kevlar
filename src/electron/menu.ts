import { Menu, MenuItemConstructorOptions } from 'electron';

export function buildMenu(
  onStart: () => void,
  onStop: () => void,
  onLogs: () => void,
  isRunning: boolean
): Menu {
  const template: MenuItemConstructorOptions[] = [
    {
      label: isRunning ? '⚡ Kevlar Running' : '🔌 Kevlar Stopped',
      enabled: false
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
