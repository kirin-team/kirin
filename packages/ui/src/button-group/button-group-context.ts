import { createContext, useContext } from 'react';
import { ButtonTypes } from '../utils/prop-types';

export interface ButtonGroupConfig {
  type?: ButtonTypes;
  ghost?: boolean;
  disabled?: boolean;
  isButtonGroup: boolean;
}

const defaultContext: ButtonGroupConfig = {
  isButtonGroup: false,
  disabled: false,
};

export const ButtonGroupContext = createContext(defaultContext);
export const useButtonGroupContext = () => useContext(ButtonGroupContext);
