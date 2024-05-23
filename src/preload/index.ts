import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

const api = {
  appendText: (textValue): Promise<null> => {
    return ipcRenderer.invoke('saveText', textValue);
  },
  ipcRenderer: {
    on(channel: string, func: (...args: any[]) => void) {
      ipcRenderer.on(channel, func);
    },
    removeListener(channel: string, func: (...args: any[]) => void) {
      ipcRenderer.removeListener(channel, func);
    },
  },
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
}
