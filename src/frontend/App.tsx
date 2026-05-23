import { WINDOW_HASH_PREFIX } from '../shared';
import { Island } from './components/Island';
import { TimeModule } from './components/modules/TimeModule';
import { Button } from './components/ui/Button';
import { WindowRouter } from './windows/WindowRouter';

export const App = () => {
  if (window.location.hash.startsWith(WINDOW_HASH_PREFIX)) {
    return <WindowRouter />;
  }

  const handleOpenSettings = async () => {
    window.WindowAPI.open({
      position: {
        x: 500,
        y: 20,
      },
      size: {
        width: 300,
        height: 300,
      },
      route: 'settings',
    });
  };

  return (
    <div className="flex items-stretch justify-center gap-[10px] h-full w-full pt-[10px]">
      <Island>
        <TimeModule />
      </Island>
      <Island>
        <Button onClick={handleOpenSettings}>
           Settings
        </Button>
      </Island>
    </div>
  );
};