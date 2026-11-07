import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { getAbout } from '@/lib/api';
import { pageMeta, resolveLocale, type LocaleParams } from '@/lib/page';
import { Profile } from '../Profile';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMeta(locale, '/about/director', getDictionary(locale).about.director) : {};
}

export default async function Director({ params }: LocaleParams) {
  const { locale } = await resolveLocale(params);
  const { director } = await getAbout();
  return <Profile person={director} locale={locale} />;
}
