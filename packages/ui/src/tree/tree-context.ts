import { createContext, useContext } from 'react';

export interface TreeConfig {
  onFileClick?: (path: string) => void;
  initialExpand: boolean;
  isImperative: boolean;
}

const defaultContext: TreeConfig = {
  initialExpand: false,
  isImperative: false,
};

export const TreeContext = createContext(defaultContext);
export const useTreeContext = () => useContext(TreeContext);
