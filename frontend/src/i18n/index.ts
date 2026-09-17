import en from './en.json';
import te from './te.json';
import type { Language } from '../types';

type I18nValue = string | string[] | { [key: string]: I18nValue };
type TranslationBundle = { [key: string]: I18nValue };

const translations: Record<Language, TranslationBundle> = {
  en: en as TranslationBundle,
  te: te as TranslationBundle,
};

function lookup(bundle: TranslationBundle, keys: string[]): I18nValue | undefined {
  let value: I18nValue | undefined = bundle;
  for (const k of keys) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      value = value[k];
    } else {
      return undefined;
    }
  }
  return value;
}

export function t(key: string, lang: Language = 'en'): string {
  const keys = key.split('.');
  const value = lookup(translations[lang] ?? translations.en, keys);
  if (typeof value === 'string') {
    return value;
  }
  const fallback = lookup(translations.en, keys);
  return typeof fallback === 'string' ? fallback : key;
}

export function tList(key: string, lang: Language = 'en'): string[] {
  const keys = key.split('.');
  const value = lookup(translations[lang] ?? translations.en, keys);
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }
  const fallback = lookup(translations.en, keys);
  return Array.isArray(fallback) ? fallback.filter((item): item is string => typeof item === 'string') : [];
}