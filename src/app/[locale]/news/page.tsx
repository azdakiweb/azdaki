import type { Metadata } from 'next';
import { NewsList } from '@/components/Cards';
import { NewsArt } from '@/components/NewsArt';
import { Container, PageHead } from '@/components/Page';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { getNews } from '@/lib/api';
import { pageMeta, resolveLocale, type LocaleParams } from '@/lib/page';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMeta(locale, '/news', getDictionary(locale).nav.news) : {};
}

export default async function News({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const items = await getNews();
  return (
    <>
      <PageHead label={t.tagline} title={t.nav.news} art={<NewsArt />} folds />
      <Container>
        <NewsList items={items} locale={locale} t={t} />
      </Container>
    </>
  );
}
