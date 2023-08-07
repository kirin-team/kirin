import { MutableRefObject, createContext, useContext } from 'react';

export interface SelectConfig {
  value?: string | string[];
  updateValue?: (next: string) => unknown;
  visible?: boolean;
  updateVisible?: (next: boolean) => unknown;
  disableAll?: boolean;
  ref?: MutableRefObject<HTMLElement | null>;
}

const defaultContext: SelectConfig = {
  visible: false,
  disableAll: false,
};

export const SelectContext = createContext(defaultContext);
export const useSelectContext = () => useContext(SelectContext);
