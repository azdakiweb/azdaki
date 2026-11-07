import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from '@/components/Icons';
import { PhotoGrid } from '@/components/PhotoGrid';
import { formatDate, isLocale, locales } from '@/i18n/config';
import { getNews, getNewsItem } from '@/lib/api';
import { pageMeta, resolveLocale } from '@/lib/page';
import styles from './article.module.css';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const all = await getNews();
  return locales.flatMap((locale) => all.map((n) => ({ locale, slug: n.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const n = await getNewsItem(slug);
  if (!n || !isLocale(locale)) return {};
  return { ...pageMeta(locale, `/news/${slug}`, n.title[locale], n.excerpt[locale]), openGraph: { images: [n.image] } };
}

export default async function NewsArticle({ params }: Props) {
  const { locale, t } = await resolveLocale(params);
  const n = await getNewsItem((await params).slug);
  if (!n) notFound();
  return (
    <article className={styles.article}>
      <header className={styles.head}>
        <Link className={styles.back} href={`/${locale}/news`}>
          <ArrowLeft />
          {t.news.back}
        </Link>
        <div className={styles.meta}>
          <time dateTime={n.date}>{formatDate(n.date, locale)}</time>
        </div>
        <h1 className={styles.title}>{n.title[locale]}</h1>
      </header>

      <div className={`frame ${styles.image}`}>
        <Image src={n.image} alt={n.imageAlt[locale]} fill sizes="100vw" quality={75} priority />
      </div>

      <div className={styles.body}>
        <div className={styles.text}>
          <p className={styles.lead}>{n.excerpt[locale]}</p>
          {n.body.map((b, i) => (
            <p key={i}>{b[locale]}</p>
          ))}
          {n.performanceSlug && (
            <Link href={`/${locale}/performances/${n.performanceSlug}`} className="arrow">
              {t.news.related}
            </Link>
          )}
        </div>
      </div>

      {n.photos.length > 0 && (
        <section className={styles.photos}>
          <h2 className={styles.photosTitle}>{t.news.photos}</h2>
          <PhotoGrid
            photos={n.photos}
            title={n.title[locale]}
            strings={{ open: t.gallery.open, prev: t.gallery.prev, next: t.gallery.next, close: t.gallery.close }}
          />
        </section>
      )}
    </article>
  );
}
