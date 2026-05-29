import { FourteenDataBase } from '../FourteenAPI';

export interface SystemClock {
  dateTime: Date;
}

export interface SystemClockData extends FourteenDataBase {
  type: 'system-clock';
  data: SystemClock;
}