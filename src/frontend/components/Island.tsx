
interface IslandProps {
  children: React.ReactNode;
}

export const Island: React.FC<IslandProps> = ({ children }) => {
  return (
    <div className="flex items-center rounded-[8px] bg-bg-100 px-4">
      {children}
    </div>
  );
};