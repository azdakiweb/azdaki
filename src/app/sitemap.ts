import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { getAlbums, getNews, getPerformances } from '@/lib/api';
import { siteUrl } from '@/lib/page';

const STATIC = [
  '',
  '/about',
  '/about/artistic-director',
  '/about/director',
  '/about/actors',
  '/about/creative-team',
  '/about/administration',
  '/performances',
  '/performances/current',
  '/news',
  '/gallery',
  '/contact',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [performances, news, albums] = await Promise.all([getPerformances(), getNews(), getAlbums()]);
  const paths = [
    ...STATIC,
    ...performances.map((p) => `/performances/${p.slug}`),
    ...news.map((n) => `/news/${n.slug}`),
    ...albums.map((a) => `/gallery/${a.slug}`),
  ];
  return paths.flatMap((path) => locales.map((l) => ({ url: `${siteUrl}/${l}${path}` })));
}
