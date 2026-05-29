import { FourteenDataBase } from '../FourteenAPI';

export type BatteryStatus = MissingBatteryStatus | IncludesBatteryStatus;

interface MissingBatteryStatus {
  hasBattery: false;
}

interface IncludesBatteryStatus {
  hasBattery: true;
  percentage: number;
  capacity: number;
  state: 'charging' | 'discharging';
  chargeCycles: number;
}

export interface BatteryStatusData extends FourteenDataBase {
  type: 'battery-status';
  data: BatteryStatus;
} 