import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { getCurrentPerformances } from '@/lib/api';
import { pageMeta, resolveLocale, type LocaleParams } from '@/lib/page';
import { PerformanceList } from '../List';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMeta(locale, '/performances/current', getDictionary(locale).perf.currentTitle) : {};
}

export default async function CurrentPerformances({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  return <PerformanceList items={await getCurrentPerformances()} noun={t.perf.nounCurrent} locale={locale} t={t} />;
}
