import { createContext, useContext } from 'react';
import type { PuterContextType } from '../types';

export const PuterContext = createContext<PuterContextType | undefined>(undefined);

export const usePuter = (): PuterContextType => {
  const context = useContext(PuterContext);
  if (!context) {
    throw new Error('usePuter must be used within a PuterProvider');
  }
  return context;
};
