import { useEffect, useState } from 'react';
import { dateToTime } from '../../libs/utils/formatTime';

interface TimeModuleProps { }

export const TimeModule: React.FC<TimeModuleProps> = ({ }) => {
  const [time, setTime] = useState<string>(dateToTime(new Date()));

  useEffect(() => {
    const key = window.Fourteen.subscribe((data) => {
      if (data.type !== 'system-clock') return;
      const dateTime = data.data.dateTime;
      const time = dateToTime(dateTime);
      setTime(time);
    })

    return () => {
      window.Fourteen.unsubscribe(key);
    };
  }, []);

  return (
    <span>TIME = {time}</span>
  );
};