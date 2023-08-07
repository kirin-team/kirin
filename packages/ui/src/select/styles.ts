import { KirinThemesPalette } from '../themes/presets';
import { NormalTypes } from '../utils/prop-types';

export type SelectColor = {
  border: string;
  borderActive: string;
  iconBorder: string;
  placeholderColor: string;
};

export function getColors(palette: KirinThemesPalette, status?: NormalTypes) {
  const colors: { [key in NormalTypes]: SelectColor } = {
    default: {
      border: palette.border,
      borderActive: palette.foreground,
      iconBorder: palette.accents_5,
      placeholderColor: palette.accents_3,
    },
    secondary: {
      border: palette.border,
      borderActive: palette.foreground,
      iconBorder: palette.accents_5,
      placeholderColor: palette.accents_3,
    },
    success: {
      border: palette.successLight,
      borderActive: palette.successDark,
      iconBorder: palette.success,
      placeholderColor: palette.accents_3,
    },
    warning: {
      border: palette.warningLight,
      borderActive: palette.warningDark,
      iconBorder: palette.warning,
      placeholderColor: palette.accents_3,
    },
    error: {
      border: palette.errorLight,
      borderActive: palette.errorDark,
      iconBorder: palette.error,
      placeholderColor: palette.error,
    },
  };

  return status ? colors[status] : colors.default;
}