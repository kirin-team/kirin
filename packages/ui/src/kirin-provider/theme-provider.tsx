import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import Themes from '../themes';
import { KirinThemes } from '../themes/presets';
import {
  AllThemesConfig,
  AllThemesContext,
} from '../use-all-themes/all-themes-context';
import { ThemeContext } from '../use-theme/theme-context';

interface Props {
  themeType?: string;
  themes?: Array<KirinThemes>;
}

export type ThemeProviderProps = Props;

export default function ThemeProvider({
  children,
  themeType,
  themes = [],
}: PropsWithChildren<ThemeProviderProps>) {
  const [allThemes, setAllThemes] = useState<AllThemesConfig>({
    themes: Themes.getPresets(),
  });

  const currentTheme = useMemo<KirinThemes>(() => {
    const theme = allThemes.themes.find((item) => item.type === themeType);

    if (theme) return theme;
    return Themes.getPresetStaticTheme();
  }, [allThemes, themeType]);

  useEffect(() => {
    if (!themes?.length) return;

    setAllThemes((last) => {
      const safeThemes = themes.filter((item) =>
        Themes.isAvailableThemeType(item.type)
      );

      const nextThemes = Themes.getPresets().concat(safeThemes);

      return {
        ...last,
        themes: nextThemes,
      };
    });
  }, [themes]);

  return (
    <AllThemesContext.Provider value={allThemes}>
      <ThemeContext.Provider value={currentTheme}>
        {children}
      </ThemeContext.Provider>
    </AllThemesContext.Provider>
  );
}
