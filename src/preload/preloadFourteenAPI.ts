import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { FOURTEEN_CHANNEL, type FourteenAPI, type FourteenData, type FourteenEvent } from '../shared';

const listeners: Record<string, FourteenEvent> = {};

ipcRenderer.on(FOURTEEN_CHANNEL.BACK, (_event: IpcRendererEvent, data: FourteenData) => {
  for (const listenerKey in listeners) {
    listeners[listenerKey](data);
  }
});

const api: FourteenAPI = {
  subscribe: (event: FourteenEvent) => {
    const key = crypto.randomUUID();
    listeners[key] = event;
    return key;
  },
  unsubscribe: (key: string) => {
    if (!(key in listeners)) return false;
    delete listeners[key];
    return true;
  },
};

contextBridge.exposeInMainWorld(FOURTEEN_CHANNEL.PROPERTY, api);