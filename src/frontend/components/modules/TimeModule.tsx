import { useEffect, useState } from 'react';
import { getTime } from '../../libs/utils/getTime';

interface TimeModuleProps { }

export const TimeModule: React.FC<TimeModuleProps> = ({ }) => {
  const [time, setTime] = useState<string>(getTime());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <span>TIME = {time}</span>
  );
};