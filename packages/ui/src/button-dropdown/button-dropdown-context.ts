import { createContext, useContext } from 'react';
import { NormalTypes } from '../utils/prop-types';

export interface ButtonDropdownConfig {
  type?: NormalTypes;
  auto?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const defaultContext: ButtonDropdownConfig = {
  type: 'default' as NormalTypes,
  auto: false,
  disabled: false,
  loading: false,
};

export const ButtonDropdownContext = createContext(defaultContext);
export const useButtonDropdown = () => useContext(ButtonDropdownContext);
