import { ipcMain, IpcMainEvent } from 'electron';
import { FourteenData, FOURTEEN_CHANNEL } from '../shared';

const handleFourteenEvent = (event: IpcMainEvent, data: FourteenData) => {
  console.log(data);

  event.reply(FOURTEEN_CHANNEL.BACK, data);
};

export const setupFourteenAPI = () => {
  ipcMain.on(FOURTEEN_CHANNEL.FORWARD, handleFourteenEvent);
};

// FourteenAPI will be used for reading and changing system stuff