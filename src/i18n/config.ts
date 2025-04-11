export const LANGUAGE_COOKIE_KEY = 'NEXT_LOCALE';
export const DEFAULT_LANGUAGE = 'zh';
export const AVAILABLE_LANGUAGES = ['zh', 'en'] as const;
export type Language = typeof AVAILABLE_LANGUAGES[number];

export const getDictionary = async (locale: Language) => {
  switch (locale) {
    case 'en':
      return import('../locales/en/common.json').then((module) => module.default);
    case 'zh':
    default:
      return import('../locales/zh/common.json').then((module) => module.default);
  }
}; 