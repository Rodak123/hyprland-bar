import { Island } from './components/Island';
import { TimeModule } from './components/modules/TimeModule';

export const App = () => {
  return (
    <div className="flex items-stretch justify-center gap-[10px] h-full w-full pt-[10px]">
      <Island>
        <TimeModule />
      </Island>
    </div>
  );
};