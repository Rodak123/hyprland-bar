import { useEffect, useState } from 'react';

export const App = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', hourCycle: 'h24', minute: '2-digit', second: '2-digit' }));
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <span>TIME = {time}</span>
    </div>
  );
};