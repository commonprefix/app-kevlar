import { shell } from 'electron';

// Open a new tab in the default browser
export function openInBrowser(url: string) {
    shell.openExternal(url);
}
