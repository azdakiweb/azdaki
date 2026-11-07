import Link from 'next/link';
import type { Metadata } from 'next';
import { HeroSlides, type HeroSlide } from '@/components/Hero';
import { Figures } from '@/components/HeroArt';
import { HomeGallery, type GallerySlide } from '@/components/HomeGallery';
import { HomeNews } from '@/components/HomeNews';
import heroStyles from '@/components/Hero.module.css';
import { Mark } from '@/components/Logo';
import { NowPlaying } from '@/components/NowPlaying';
import { formatDate, isLocale } from '@/i18n/config';
import { getAbout, getAlbums, getHeroPerformances, getNews, getPerformances } from '@/lib/api';
import { pageMeta, resolveLocale, type LocaleParams } from '@/lib/page';
import styles from './home.module.css';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMeta(locale, '') : {};
}

export default async function Home({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const [heroItems, performances, news, albums, about] = await Promise.all([
    getHeroPerformances(),
    getPerformances(),
    getNews(),
    getAlbums(),
    getAbout(),
  ]);

  const slides: HeroSlide[] = heroItems.map((p) => ({
    href: `/${locale}/performances/${p.slug}`,
    meta: p.dates[0] ? `${t.perf.nextShow} · ${formatDate(p.dates[0].at, locale)}` : p.genre[locale],
    title: p.title[locale],
    excerpt: p.summary[locale],
    image: p.cover!.src,
    alt: p.cover!.alt[locale],
  }));
  // Real photographs first; the drawn placeholders fill the rest.
  const gallerySlides: GallerySlide[] = albums
    .flatMap((a) => a.photos.map(({ src }) => ({ src, album: a.title[locale], href: `/${locale}/gallery/${a.slug}`, avatar: a.photos[0].src })))
    .filter((s, i, all) => all.findIndex((x) => x.src === s.src) === i)
    .sort((a, b) => Number(b.src.includes('/covers/')) - Number(a.src.includes('/covers/')))
    .slice(0, 7);

  return (
    <>
      <section className={`${heroStyles.hero} on-dark`}>
        <HeroSlides
          slides={slides}
          strings={{
            label: t.home.slides,
            prev: t.home.prev,
            next: t.home.next,
            view: t.home.view,
          }}
        >
          <p className={`label ${heroStyles.tagline}`}>{t.tagline}</p>
          <h1 className={heroStyles.name}>{t.brand}</h1>
          <Figures />
        </HeroSlides>
      </section>

      <section className={styles.now} aria-labelledby="now">
        <NowPlaying items={performances} locale={locale} t={t} titleId="now" />
      </section>

      <section className={`${styles.about} on-dark`} aria-labelledby="about">
        <div className={styles.aboutHead}>
          <h2 id="about" className={styles.aboutLabel}>
            {t.home.aboutTitle}
          </h2>
        </div>
        <p className={styles.mission}>{about.mission[locale]}</p>
        <div className={styles.aboutFoot}>
          <p className={styles.year}>{about.history.year}</p>
          <Link href={`/${locale}/about`} className={styles.aboutLink}>
            {t.home.more}
          </Link>
        </div>
        <Mark className={styles.aboutMark} />
      </section>

      <section className={styles.section} aria-labelledby="news">
        <HomeNews items={news.slice(0, 4)} locale={locale} t={t} titleId="news" />
      </section>

      <section className={styles.gallery} aria-labelledby="gallery">
        <HomeGallery
          slides={gallerySlides}
          titleId="gallery"
          strings={{
            title: t.gallery.fragment,
            all: t.gallery.all,
            allHref: `/${locale}/gallery`,
            prev: t.gallery.prev,
            next: t.gallery.next,
            open: t.gallery.open,
            close: t.gallery.close,
          }}
        />
      </section>
    </>
  );
}
