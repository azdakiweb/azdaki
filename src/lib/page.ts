import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';

export type LocaleParams = { params: Promise<{ locale: string }> };

export const resolveLocale = async (params: Promise<{ locale: string }>) => {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { locale, t: getDictionary(locale) };
};

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/** Title, description and hreflang links for a path given without its locale. */
export const pageMeta = (locale: Locale, path: string, title?: string, description?: string): Metadata => ({
  ...(title ? { title } : {}),
  description: description ?? getDictionary(locale).slogan,
  alternates: {
    canonical: `/${locale}${path}`,
    languages: Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
  },
});

/** "01", "02", ... as used for numbering throughout the brand board. */
export const pad = (n: number) => String(n).padStart(2, '0');
