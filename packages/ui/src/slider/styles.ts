import { KirinThemesPalette } from '../themes/presets';
import { NormalTypes } from '../utils/prop-types';

export type SelectColor = {
  bg: string;
};

export function getColors(palette: KirinThemesPalette, status?: NormalTypes) {
  const colors: { [key in NormalTypes]: SelectColor } = {
    default: { bg: palette.accents_8 },
    secondary: { bg: palette.accents_8 },
    success: { bg: palette.success },
    warning: { bg: palette.warning },
    error: { bg: palette.error },
  };

  return status ? colors[status] : colors.default;
}
