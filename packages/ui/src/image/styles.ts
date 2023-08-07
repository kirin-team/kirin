import { KirinThemesPalette } from '../themes/presets';

export type BrowserColors = {
  color: string;
  barBgColor: string;
  inputBgColor: string;
  borderColor: string;
  titleColor: string;
};

export function getBrowserColors(
  invert: boolean,
  palette: KirinThemesPalette
): BrowserColors {
  return invert
    ? {
        color: palette.background,
        barBgColor: palette.foreground,
        inputBgColor: palette.accents_8,
        borderColor: palette.accents_7,
        titleColor: palette.accents_2,
      }
    : {
        color: palette.foreground,
        barBgColor: palette.background,
        inputBgColor: palette.accents_1,
        borderColor: palette.border,
        titleColor: palette.accents_5,
      };
}