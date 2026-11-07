import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { getPerformances } from '@/lib/api';
import { pageMeta, resolveLocale, type LocaleParams } from '@/lib/page';
import { PerformanceList } from './List';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMeta(locale, '/performances', getDictionary(locale).nav.performances) : {};
}

export default async function Performances({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  return <PerformanceList items={await getPerformances()} noun={t.perf.nounAll} locale={locale} t={t} />;
}
