import { createContext, useContext } from 'react';

export interface CheckboxConfig {
  updateState?: (value: string, checked: boolean) => void;
  disabledAll: boolean;
  values: string[];
  inGroup: boolean;
}

const defaultContext: CheckboxConfig = {
  disabledAll: false,
  inGroup: false,
  values: [],
};

export const CheckboxContext = createContext(defaultContext);
export const useCheckbox = () => useContext(CheckboxContext);
