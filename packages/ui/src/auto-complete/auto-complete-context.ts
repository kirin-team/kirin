import { MutableRefObject, createContext, useContext } from 'react';

export interface AutoCompleteConfig {
  value?: string;
  updateValue?: (val: string) => unknown;
  visible?: boolean;
  updateVisible?: (next: boolean) => unknown;
  ref?: MutableRefObject<HTMLElement | null>;
}

const defaultContext: AutoCompleteConfig = {
  visible: false,
};

export const AutoCompleteContext = createContext(defaultContext);
export const useAutoCompleteContext = () => useContext(AutoCompleteContext);
