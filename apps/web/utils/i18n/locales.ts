import 'server-only';
import { Locale } from '../../middleware';

const locales = {
  en: () => import('../../locales/en.json').then((module) => module.default),
};

export const getLocale = async (locale: Locale) => locales[locale]();
