import { createContext, useContext } from 'react';

export interface CollapseConfig {
  values: Array<number>;
  updateValues?: (
    currentIndex: number | undefined,
    nextState: boolean
  ) => unknown;
}

const defaultContext: CollapseConfig = {
  values: [],
};

export const CollapseContext = createContext(defaultContext);
export const useCollapseContext = () => useContext(CollapseContext);
