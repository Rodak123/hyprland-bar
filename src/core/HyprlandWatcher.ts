import { execSync } from 'child_process';

interface HyprctlWorkspaces {
  id: number;
  windows: number;
}

interface HyprctlActiveWorkspace {
  id: number;
  windows: number;
}

export interface HyprlandWorkspace {
  id: number;
  windows: number;
  isActive: boolean;
}

export type OnWorkspacesChanged = (workspaces: HyprlandWorkspace[]) => void;

export class HyprlandWatcher {
  private _onWorkspacesChanged: OnWorkspacesChanged;

  private _workspaces: HyprlandWorkspace[] = [];

  private _workspaceInterval: NodeJS.Timeout | null = null;

  constructor(onWorkspacesChanged: OnWorkspacesChanged) {
    this._onWorkspacesChanged = onWorkspacesChanged;
  }

  private setWorkspaces(workspaces: HyprlandWorkspace[]) {
    this._workspaces = workspaces;
    this._onWorkspacesChanged(this._workspaces);
  }

  private fetchWorkspaces(): HyprlandWorkspace[] | null {
    let raw;
    try {
      raw = execSync('hyprctl workspaces -j').toString();
      const workspaces = JSON.parse(raw) as HyprctlWorkspaces[];

      raw = execSync('hyprctl activeworkspace -j').toString();
      const activeWorkspace = JSON.parse(raw) as HyprctlActiveWorkspace;

      return workspaces.map((workspace) => {
        return {
          ...workspace,
          isActive: workspace.id === activeWorkspace.id,
        };
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public start() {
    this._workspaceInterval = setInterval(() => {
      const newWorkspaces = this.fetchWorkspaces();
      if (newWorkspaces === null) return;
      // if (this._workspaces.length === newWorkspaces.length && this._workspaces.every((workspace, index) => workspace.id === newWorkspaces[index].id))
      //   return;
      this.setWorkspaces(newWorkspaces);
    }, 200);
  }

  public stop() {
    if (this._workspaceInterval !== null) clearInterval(this._workspaceInterval);
  }
}