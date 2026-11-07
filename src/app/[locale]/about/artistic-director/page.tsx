import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { getAbout } from '@/lib/api';
import { pageMeta, resolveLocale, type LocaleParams } from '@/lib/page';
import { Profile } from '../Profile';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMeta(locale, '/about/artistic-director', getDictionary(locale).about.artisticDirector) : {};
}

export default async function ArtisticDirector({ params }: LocaleParams) {
  const { locale } = await resolveLocale(params);
  const { artisticDirector } = await getAbout();
  return <Profile person={artisticDirector} locale={locale} />;
}
