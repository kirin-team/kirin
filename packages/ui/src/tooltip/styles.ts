import { KirinThemesPalette } from '../themes/presets';
import { SnippetTypes } from '../utils/prop-types';

export type TooltipColors = {
  bgColor: string;
  color: string;
};

export function getColors(type: SnippetTypes, palette: KirinThemesPalette) {
  const colors: { [key in SnippetTypes]: string } = {
    default: palette.background,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    secondary: palette.secondary,
    dark: palette.foreground,
    lite: palette.background,
  };

  const color =
    type === 'lite' || type === 'default'
      ? palette.foreground
      : palette.background;

  return {
    color,
    bgColor: colors[type],
  };
}
