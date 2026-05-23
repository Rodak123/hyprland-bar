
export const FOURTEEN_CHANNEL = {
  FORWARD: 'fourteen',
  BACK: 'fourteen-back',
  PROPERTY: 'Fourteen',
} as const;

export type FourteenData = string;
export type FourteenEvent = (data: FourteenData) => void;

export interface FourteenAPI {
  send: FourteenEvent;
  subscribe: (event: FourteenEvent) => string;
  unsubscribe: (key: string) => boolean;
}

declare global {
  interface Window {
    Fourteen: FourteenAPI; // this name must match PROPERTY in CHANNEL const above
  }
}