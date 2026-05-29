import { useEffect, useState } from 'react';
import { Workspace } from '../../../shared';
import { cm } from '../../libs/utils/cm';

interface WorkspaceModuleProps { }

export const WorkspaceModule: React.FC<WorkspaceModuleProps> = ({ }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  useEffect(() => {
    const key = window.Fourteen.subscribe((data) => {
      if (data.type !== 'hyprland-info') return;
      const workspaces = data.data.workspaces.sort((a, b) => a.id - b.id);
      setWorkspaces(workspaces);
    })

    return () => {
      window.Fourteen.unsubscribe(key);
    };
  }, []);

  const completeWorkspaces: Workspace[] = [];
  for (const workspace of workspaces) {
    const lastId = completeWorkspaces.at(-1)?.id ?? 0;
    for (let n = lastId + 1; n < workspace.id; n++) {
      completeWorkspaces.push({
        id: n,
        windows: 0,
        isActive: false,
      });
    }
    completeWorkspaces.push(workspace);
  }

  return (
    <>
      {completeWorkspaces.map((workspace) => {
        return (
          <div key={workspace.id} className={cm(workspace.isActive && 'bg-primary-300', 'flex justify-center items-center gap-3 px-2 h-full min-w-[40px] transition-all')}>
            {new Array(workspace.windows - (workspace.isActive ? 1 : 0)).fill(0).map((_, i) => {
              return <span key={i}>X</span>
            })}
          </div>
        );
      })}
    </>
  );
};