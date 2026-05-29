import { useEffect, useState } from 'react';
import { BatteryStatus } from '../../../shared';
import { Preloader } from '../ui/Preloader';

interface BatteryModuleProps { }

export const BatteryModule: React.FC<BatteryModuleProps> = ({ }) => {
  const [batteryStatus, setBatteryStatus] = useState<BatteryStatus | null>(null);

  useEffect(() => {
    const key = window.Fourteen.subscribe((data) => {
      if (data.type !== 'battery-status') return;
      setBatteryStatus(data.data);
    })

    return () => {
      window.Fourteen.unsubscribe(key);
    };
  }, []);

  if (batteryStatus === null) {
    return <Preloader />;
  }

  if (batteryStatus.hasBattery === false) {
    return <span>BATTERY = N\A</span>;
  }

  return (
    <span title={`capacity: ${batteryStatus.capacity}%, cycles: ${batteryStatus.chargeCycles}, state: ${batteryStatus.state}`}>BATTERY = {batteryStatus.percentage}%</span>
  );
};