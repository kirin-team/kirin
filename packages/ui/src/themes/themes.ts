import type { DeepPartial } from '../utils/types';
import darkTheme from './presets/dark';
import { KirinThemes } from './presets/index';
import lightTheme from './presets/light';

export type KirinUserTheme = DeepPartial<KirinThemes> & { type: string };

export function isObject(target: unknown) {
  return typeof target === 'object';
}

export function deepDuplicable<T extends Record<string, unknown>>(
  source: T,
  target: T
): T {
  if (!isObject(target) || !isObject(source)) return source as T;

  const sourceKeys = Object.keys(source) as Array<keyof T>;

  let result = {} as any;

  for (const key of sourceKeys) {
    const sourceValue = source[key];
    const targetValue = target[key];

    if (Array.isArray(sourceValue) && Array.isArray(targetValue))
      result[key] = targetValue.concat(sourceValue);
    else if (isObject(sourceValue) && isObject(targetValue))
      result[key] = deepDuplicable(sourceValue as Record<string, unknown>, {
        ...(targetValue as Record<string, unknown>),
      });
    else if (targetValue) result[key] = targetValue;
    else result[key] = sourceValue;
  }
  return result;
}

function getPresets() {
  return [lightTheme, darkTheme];
}

function getPresetStaticTheme() {
  return lightTheme;
}

function isAvailableThemeType(type?: string) {
  if (!type) return false;

  const presetThemes = getPresets();
  const hasType = presetThemes.find((theme) => theme.type === type);

  return !hasType;
}

function isPresetTheme(themeOrType?: KirinUserTheme | KirinThemes | string) {
  if (!themeOrType) return false;

  const isType = typeof themeOrType === 'string';
  const type = isType
    ? (themeOrType as string)
    : (themeOrType as Exclude<typeof themeOrType, string>).type;

  return !isAvailableThemeType(type);
}

function hasUserCustomTheme(themes: Array<KirinThemes> = []) {
  return !!themes.find((item) => isAvailableThemeType(item.type));
}

function create(base: KirinThemes, custom: KirinUserTheme) {
  if (!isAvailableThemeType(custom.type))
    throw new Error('Duplicate or Invalid Theme');

  return deepDuplicable(base, custom) as KirinThemes;
}

const createFromDark = (custom: KirinUserTheme) => create(darkTheme, custom);
const createFromLight = (custom: KirinUserTheme) => create(lightTheme, custom);

const Themes = {
  isPresetTheme,
  isAvailableThemeType,
  hasUserCustomTheme,
  getPresets,
  getPresetStaticTheme,
  create,
  createFromDark,
  createFromLight,
};

export default Themes;
