import { createContext, useContext, useState } from 'react';

type NewNodeType = 'init' | 'def' | 'secondary';

const DnDContext = createContext<
  [NewNodeType | null, (type: NewNodeType | null) => void]
>([null, () => {}]);

export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<NewNodeType | null>(null);

  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;

export const useDnD = () => useContext(DnDContext);
