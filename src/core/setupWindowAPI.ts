import { ipcMain, IpcMainEvent, BrowserWindow } from 'electron';
import { WINDOW_CHANNEL, WINDOW_HASH_PREFIX, WindowOpenData } from '../shared';
import path from 'node:path';

const handleWindowOpen = (_event: IpcMainEvent, data: WindowOpenData) => {
  // Create the browser window.
  const popup = new BrowserWindow({
    title: 'Topbar Popup',
    width: data.size.width,
    height: data.size.height,
    x: data.position.x,
    y: data.position.y,
    alwaysOnTop: true,
    show: true,
    resizable: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  popup.setMenuBarVisibility(false);
  popup.setAutoHideMenuBar(true);

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    popup.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}${WINDOW_HASH_PREFIX}${data.route}`);
  } else {
    popup.loadFile(
      path.join(__dirname, `../../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
      { hash: data.route }
    );
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

const handleWindowClose = (event: IpcMainEvent) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win?.close();
};

export const setupWindowAPI = () => {
  ipcMain.on(WINDOW_CHANNEL.OPEN, handleWindowOpen);
  ipcMain.on(WINDOW_CHANNEL.CLOSE, handleWindowClose);
};

// WindowAPI is used for managing popup windows