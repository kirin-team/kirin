import { createContext, useContext } from 'react';
import Themes from '../themes';

const defaultTheme = Themes.getPresetStaticTheme();

export const ThemeContext = createContext(defaultTheme);
export const useTheme = () => useContext(ThemeContext);
