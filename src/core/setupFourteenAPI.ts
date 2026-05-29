import { BrowserWindow } from 'electron';
import { FourteenData, FOURTEEN_CHANNEL } from '../shared';
import si from 'systeminformation';
import { HyprlandWatcher } from './HyprlandWatcher';

const emitData = (data: FourteenData) => {
  const windows = BrowserWindow.getAllWindows();
  windows.forEach((window) => {
    if (!window.isDestroyed()) {
      window.webContents.send(FOURTEEN_CHANNEL.BACK, data);
    }
  });
};

const setupSystemClock = () => {
  setInterval(() => {
    emitData({
      type: 'system-clock',
      data: {
        dateTime: new Date(),
      }
    })
  }, 1000);
};

const setupBatteryStatus = () => {
  setInterval(async () => {
    const data: si.Systeminformation.BatteryData = await si.battery();

    emitData({
      type: 'battery-status',
      data: data.hasBattery
        ? {
          hasBattery: true,
          percentage: data.percent,
          capacity: Math.round(data.currentCapacity / data.designedCapacity * 100),
          chargeCycles: data.cycleCount,
          state: data.isCharging ? 'charging' : 'discharging'
        }
        : {
          hasBattery: false,
        }
    })
  }, 1000);
};

const setupHyprlandInfo = () => {
  const watcher = new HyprlandWatcher(
    (workspaces) => {
      emitData({
        type: 'hyprland-info',
        data: {
          workspaces: workspaces
        }
      });
    }
  );
  watcher.start();
};

export const setupFourteenAPI = () => {
  setupSystemClock();
  setupBatteryStatus();
  setupHyprlandInfo();
};

// FourteenAPI will be used for reading and changing system stuff