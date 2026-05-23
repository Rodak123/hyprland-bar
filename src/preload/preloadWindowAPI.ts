import { contextBridge, ipcRenderer } from 'electron';
import { WINDOW_CHANNEL, WindowOpenData, type WindowAPI } from '../shared';

const api: WindowAPI = {
  open: (data: WindowOpenData) => ipcRenderer.send(WINDOW_CHANNEL.OPEN, data),
  close: () => ipcRenderer.send(WINDOW_CHANNEL.CLOSE),
};

contextBridge.exposeInMainWorld(WINDOW_CHANNEL.PROPERTY, api);
