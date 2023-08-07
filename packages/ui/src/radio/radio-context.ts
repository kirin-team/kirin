import { createContext, useContext } from 'react';

export interface RadioConfig {
  updateState?: (value: string | number) => void;
  disabledAll: boolean;
  value?: string | number;
  inGroup: boolean;
}

const defaultContext: RadioConfig = {
  disabledAll: false,
  inGroup: false,
};

export const RadioContext = createContext(defaultContext);
export const useRadioContext = () => useContext(RadioContext);
