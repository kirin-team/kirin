import { KirinThemesPalette } from '../themes/presets';
import { addColorAlpha } from '../utils/color';
import { ButtonTypes } from '../utils/prop-types';
import { ButtonProps } from './button';

export interface ButtonColorGroup {
  bg: string;
  border: string;
  color: string;
}

export const getButtonGhostColors = (
  palette: KirinThemesPalette,
  type: ButtonTypes
): ButtonColorGroup | null => {
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    secondary: {
      bg: palette.background,
      border: palette.foreground,
      color: palette.foreground,
    },
    success: {
      bg: palette.background,
      border: palette.success,
      color: palette.success,
    },
    warning: {
      bg: palette.background,
      border: palette.warning,
      color: palette.warning,
    },
    error: {
      bg: palette.background,
      border: palette.error,
      color: palette.error,
    },
  };

  return colors[type] || null;
};

export const getButtonColors = (
  palette: KirinThemesPalette,
  props: ButtonProps
): ButtonColorGroup => {
  const { type, disabled, ghost } = props;

  if (disabled)
    return {
      bg: palette.accents_1,
      border: palette.accents_2,
      color: '#ccc',
    };

  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    default: {
      bg: palette.background,
      border: palette.border,
      color: palette.accents_5,
    },
    secondary: {
      bg: palette.foreground,
      border: palette.foreground,
      color: palette.background,
    },
    success: {
      bg: palette.success,
      border: palette.success,
      color: '#fff',
    },
    warning: {
      bg: palette.warning,
      border: palette.warning,
      color: '#fff',
    },
    error: {
      bg: palette.error,
      border: palette.error,
      color: '#fff',
    },
    abort: {
      bg: 'transparent',
      border: 'transparent',
      color: palette.accents_5,
    },
  };

  const withoutLightType = type?.replace('-light', '') as ButtonTypes;
  const defaultColor = colors.default as ButtonColorGroup;

  if (ghost)
    return getButtonGhostColors(palette, withoutLightType) || defaultColor;

  return colors[withoutLightType] || defaultColor;
};

export const getButtonGhostHoverColors = (
  palette: KirinThemesPalette,
  type: ButtonTypes
): ButtonColorGroup | null => {
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    secondary: {
      bg: palette.foreground,
      border: palette.background,
      color: palette.background,
    },
    success: {
      bg: palette.success,
      border: palette.background,
      color: 'white',
    },
    warning: {
      bg: palette.warning,
      border: palette.background,
      color: 'white',
    },
    error: {
      bg: palette.error,
      border: palette.background,
      color: 'white',
    },
  };

  const withoutLightType = type.replace('-light', '') as ButtonTypes;

  return colors[withoutLightType] || null;
};

export const getButtonHoverColors = (
  palette: KirinThemesPalette,
  props: ButtonProps
): ButtonColorGroup => {
  const { type, disabled, loading, shadow, ghost } = props;

  if (disabled)
    return {
      bg: palette.accents_1,
      border: palette.accents_2,
      color: '#ccc',
    };

  const defaultColor = getButtonColors(palette, props);
  const alphaBackground = addColorAlpha(defaultColor.bg, 0.85);

  if (loading)
    return {
      ...defaultColor,
      color: 'transparent',
    };

  if (shadow) return defaultColor;

  const colors: {
    [key in ButtonTypes]: Omit<ButtonColorGroup, 'color'> & { color?: string };
  } = {
    default: {
      bg: palette.background,
      border: palette.foreground,
    },
    secondary: {
      bg: palette.background,
      border: palette.foreground,
    },
    success: {
      bg: palette.background,
      border: palette.success,
    },
    warning: {
      bg: palette.background,
      border: palette.warning,
    },
    error: {
      bg: palette.background,
      border: palette.error,
    },
    abort: {
      bg: 'transparent',
      border: 'transparent',
      color: palette.accents_5,
    },
    'secondary-light': {
      ...defaultColor,
      bg: alphaBackground,
    },
    'success-light': {
      ...defaultColor,
      bg: alphaBackground,
    },
    'warning-light': {
      ...defaultColor,
      bg: alphaBackground,
    },
    'error-light': {
      ...defaultColor,
      bg: alphaBackground,
    },
  };

  const hoverColor =
    (ghost ? getButtonGhostHoverColors(palette, type!) : colors[type!]) ||
    colors.default;

  return {
    ...hoverColor,
    color: hoverColor.color || hoverColor.border,
  };
};

export interface ButtonCursorGroup {
  cursor: string;
  events: string;
}

export const getButtonCursor = (
  disabled: boolean,
  loading: boolean
): ButtonCursorGroup => {
  if (disabled)
    return {
      cursor: 'not-allowed',
      events: 'auto',
    };

  if (loading)
    return {
      cursor: 'default',
      events: 'none',
    };

  return {
    cursor: 'pointer',
    events: 'auto',
  };
};

export const getButtonDripColor = (
  palette: KirinThemesPalette,
  props: ButtonProps
) => {
  const { type } = props;

  const isLightHover = type?.endsWith('light');
  const hoverColors = getButtonHoverColors(palette, props);

  return isLightHover
    ? addColorAlpha(hoverColors.bg, 0.65)
    : addColorAlpha(palette.accents_2, 0.65);
};