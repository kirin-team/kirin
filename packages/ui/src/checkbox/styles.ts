import { KirinThemesPalette } from '../themes/presets';
import { NormalTypes } from '../utils/prop-types';

export type CheckboxColor = {
  fill: string;
  bg: string;
};

export const getColors = (
  palette: KirinThemesPalette,
  status?: NormalTypes
): CheckboxColor => {
  const colors: { [key in NormalTypes]: CheckboxColor } = {
    default: {
      fill: palette.foreground,
      bg: palette.background,
    },
    secondary: {
      fill: palette.foreground,
      bg: palette.background,
    },
    success: {
      fill: palette.success,
      bg: palette.background,
    },
    warning: {
      fill: palette.warning,
      bg: palette.background,
    },
    error: {
      fill: palette.error,
      bg: palette.background,
    },
  };

  return status ? colors[status] : colors.default;
};
