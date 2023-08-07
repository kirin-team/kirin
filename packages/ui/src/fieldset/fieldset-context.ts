import { createContext, useContext } from 'react';

export interface FieldItem {
  value: string;
  label: string;
}

export interface FieldsetConfig {
  register?: (item: FieldItem) => void;
  currentValue: string;
  inGroup: boolean;
}

const defaultContext: FieldsetConfig = {
  inGroup: false,
  currentValue: '',
};

export const FieldsetContext = createContext(defaultContext);
export const useFieldset = () => useContext(FieldsetContext);
