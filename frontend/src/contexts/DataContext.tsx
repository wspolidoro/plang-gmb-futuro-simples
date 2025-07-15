import { createContext, useContext, useState, ReactNode } from 'react';

type SharedData = {
  [key: string]: any;
};

type SharedDataContextType = {
  data: SharedData;
  setData: (newData: SharedData) => void;
};

const SharedDataContext = createContext<SharedDataContextType | undefined>(undefined);

export const SharedDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setDataState] = useState<SharedData>({});

  const setData = (newData: SharedData) => {
    setDataState(prev => ({ ...prev, ...newData }));
  };

  return (
    <SharedDataContext.Provider value={{ data, setData }}>
      {children}
    </SharedDataContext.Provider>
  );
};

export const useSharedData = () => {
  const context = useContext(SharedDataContext);
  if (!context) throw new Error("useSharedData must be used within SharedDataProvider");
  return context;
};

