import React, { createContext, useContext, useState, ReactNode } from 'react';

interface IDirectorId {
  directorId: number;
  setDirectorId: React.Dispatch<React.SetStateAction<number>>;
}

export const DirectorContext = createContext<IDirectorId | undefined>(
  undefined
);

interface IDirectorProviderProps {
  children: ReactNode;
}

export const DirectorProvider = ({ children }: IDirectorProviderProps) => {
  const [directorId, setDirectorId] = useState<number>(0);
  return (
    <DirectorContext.Provider value={{ directorId, setDirectorId }}>
      {children}
    </DirectorContext.Provider>
  );
};

export const useDirectorId = (): IDirectorId => {
  const context = useContext(DirectorContext);
  if (!context) {
    throw new Error(
      'useDirectorId deve ser usado dentro de um DirectorProvider'
    );
  }
  return context;
};
