
export const getTime = () => {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', hourCycle: 'h24', minute: '2-digit', second: '2-digit' });
  return time;
};