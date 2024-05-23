import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Define the type for our custom API
interface CustomAPI {
  appendText: (textValue: string) => Promise<null>;
  ipcRenderer: {
    on(channel: string, func: (event: IpcRendererEvent, ...args: unknown[]) => void): void;
    removeListener(channel: string, func: (event: IpcRendererEvent, ...args: unknown[]) => void): void;
  };
}

// Create our custom API
const api: CustomAPI = {
  appendText: (textValue): Promise<null> => {
    return ipcRenderer.invoke('saveText', textValue);
  },
  ipcRenderer: {
    on(channel: string, func: (event: IpcRendererEvent, ...args: unknown[]) => void): void {
      ipcRenderer.on(channel, func);
    },
    removeListener(channel: string, func: (event: IpcRendererEvent, ...args: unknown[]) => void): void {
      ipcRenderer.removeListener(channel, func);
    },
  },
};

// Expose the APIs to the renderer process
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

// Extend the Window interface
declare global {
  interface Window {
    electron: typeof electronAPI;
    api: CustomAPI;
  }
}
