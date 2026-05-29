import { FourteenDataBase } from '../FourteenAPI';

export interface Workspace {
  id: number;
  windows: number;
  isActive: boolean;
}

export interface HyprlandInfo {
  workspaces: Workspace[];
}

export interface HyprlandInfoData extends FourteenDataBase {
  type: 'hyprland-info';
  data: HyprlandInfo;
} 