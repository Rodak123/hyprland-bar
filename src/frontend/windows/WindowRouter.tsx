import { WINDOW_HASH_PREFIX } from '../../shared';
import { Button } from '../components/ui/Button';

export const WindowRouter: React.FC = () => {
  const windowRoute = window.location.hash.substring(WINDOW_HASH_PREFIX.length);

  return (
    <div className="w-screen h-screen flex flex-col bg-ui-bg rounded-[8px]">
      <p>{windowRoute}</p>
      <div>
        <Button onClick={() => window.WindowAPI.close()}>
          Close Window
        </Button>
      </div>
    </div>
  );
};