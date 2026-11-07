import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from '@/components/Icons';
import { Container, PageHead } from '@/components/Page';
import { PhotoGrid } from '@/components/PhotoGrid';
import { formatDate, isLocale, locales } from '@/i18n/config';
import { getAlbum, getAlbums } from '@/lib/api';
import { pageMeta, resolveLocale } from '@/lib/page';
import styles from '../gallery.module.css';

type Props = { params: Promise<{ locale: string; album: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const all = await getAlbums();
  return locales.flatMap((locale) => all.map((a) => ({ locale, album: a.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, album } = await params;
  const a = await getAlbum(album);
  if (!a || !isLocale(locale)) return {};
  return pageMeta(locale, `/gallery/${album}`, a.title[locale]);
}

export default async function AlbumPage({ params }: Props) {
  const { locale, t } = await resolveLocale(params);
  const a = await getAlbum((await params).album);
  if (!a) notFound();
  return (
    <>
      <PageHead label={formatDate(a.date, locale)} title={a.title[locale]} />
      <Container>
        <Link href={`/${locale}/gallery`} className={styles.back}>
          <ArrowLeft />
          {t.gallery.back}
        </Link>
        <PhotoGrid
          photos={a.photos.map((p) => p.src)}
          title={a.title[locale]}
          strings={{ open: t.gallery.open, prev: t.gallery.prev, next: t.gallery.next, close: t.gallery.close }}
        />
      </Container>
    </>
  );
}
