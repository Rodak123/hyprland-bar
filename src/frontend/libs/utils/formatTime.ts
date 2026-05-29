
export const dateToTime = (date: Date) => {
  const time = date.toLocaleTimeString([], { hour: '2-digit', hourCycle: 'h24', minute: '2-digit', second: '2-digit' });
  return time;
};