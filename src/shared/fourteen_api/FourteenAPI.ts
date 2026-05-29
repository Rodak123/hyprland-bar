import { BatteryStatusData } from './endpoints/BatteryStatus';
import { HyprlandInfoData } from './endpoints/HyprlandInfo';
import { SystemClockData } from './endpoints/SystemClock';

export const FOURTEEN_CHANNEL = {
  BACK: 'fourteen',
  PROPERTY: 'Fourteen',
} as const;

export interface FourteenDataBase {
  type: string;
}

export type FourteenData =
  SystemClockData | BatteryStatusData | HyprlandInfoData;

export type FourteenEvent = (data: FourteenData) => void;

export interface FourteenAPI {
  subscribe: (event: FourteenEvent) => string;
  unsubscribe: (key: string) => boolean;
}

declare global {
  interface Window {
    Fourteen: FourteenAPI; // this name must match PROPERTY in CHANNEL const above
  }
}