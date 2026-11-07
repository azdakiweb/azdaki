import type { Metadata } from 'next';
import { GalleryArt } from '@/components/GalleryArt';
import { PageHead } from '@/components/Page';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { getAlbums, getVideos } from '@/lib/api';
import { pageMeta, resolveLocale, type LocaleParams } from '@/lib/page';
import { GalleryFeed } from './GalleryFeed';
import styles from './gallery.module.css';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMeta(locale, '/gallery', getDictionary(locale).nav.gallery) : {};
}

export default async function Gallery({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const [albums, videos] = await Promise.all([getAlbums(), getVideos()]);
  return (
    <>
      <PageHead label={t.tagline} title={t.nav.gallery} art={<GalleryArt />} />
      <div className={styles.feedWrap}>
        <GalleryFeed
          albums={albums.map((a) => ({
            slug: a.slug,
            title: a.title[locale],
            href: `/${locale}/gallery/${a.slug}`,
            photos: a.photos,
          }))}
          videos={videos.map((v) => ({ youtubeId: v.youtubeId, title: v.title[locale], poster: v.poster }))}
          allLabel={t.gallery.allPhotos}
          videoStrings={{ label: t.gallery.videos, play: t.gallery.play }}
          strings={{ open: t.gallery.open, prev: t.gallery.prev, next: t.gallery.next, close: t.gallery.close }}
        />
      </div>
    </>
  );
}
