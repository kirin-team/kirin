import { createContext, useContext } from 'react';
import { KirinThemes } from '../themes/presets';
import Themes from '../themes/themes';

export type AllThemesConfig = {
  themes: Array<KirinThemes>;
};

const defaultAllThemesConfig: AllThemesConfig = {
  themes: Themes.getPresets(),
};

export const AllThemesContext = createContext(defaultAllThemesConfig);
export const useAllThemes = () => useContext(AllThemesContext);
