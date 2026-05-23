
const channelName = 'window-api';
export const WINDOW_CHANNEL = {
  OPEN: `${channelName}:open`,
  CLOSE: `${channelName}:close`,
  PROPERTY: 'WindowAPI',
} as const;

export const WINDOW_HASH_PREFIX = '#window-';

export interface WindowOpenData {
  size: {
    width: number;
    height: number;
  },
  position: {
    x: number;
    y: number;
  },
  route: string;
};

export interface WindowAPI {
  open: (data: WindowOpenData) => void;
  close: () => void;
}

declare global {
  interface Window {
    WindowAPI: WindowAPI; // this name must match PROPERTY in CHANNEL const above
  }
}