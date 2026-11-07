import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarIcon } from '@/components/Icons';
import { MapEmbed } from '@/components/MapEmbed';
import { PhotoGrid } from '@/components/PhotoGrid';
import { VideoFacade } from '@/components/VideoFacade';
import { formatDate, formatTime, isLocale, locales } from '@/i18n/config';
import { getPerformance, getPerformances, getSite } from '@/lib/api';
import { pageMeta, resolveLocale } from '@/lib/page';
import styles from '../performances.module.css';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const all = await getPerformances();
  return locales.flatMap((locale) => all.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = await getPerformance(slug);
  if (!p || !isLocale(locale)) return {};
  return { ...pageMeta(locale, `/performances/${slug}`, p.title[locale], p.summary[locale]), openGraph: { images: [p.poster] } };
}

export default async function PerformancePage({ params }: Props) {
  const { locale, t } = await resolveLocale(params);
  const [p, site] = await Promise.all([getPerformance((await params).slug), getSite()]);
  if (!p) notFound();

  const details = [
    { label: t.perf.author, value: p.author[locale] },
    { label: t.perf.director, value: p.director[locale] },
  ];
  const tags = [p.genre[locale], `${p.durationMin} ${t.perf.minutes}`, p.age];

  return (
    <article className={styles.show}>
      <Link className={styles.back} href={`/${locale}/performances`}>
        <ArrowLeft />
        {t.perf.back}
      </Link>

      <div className={styles.layout}>
        <header className={styles.intro}>
          <div className={`frame ${styles.poster}`}>
            <Image
              src={p.cover?.src ?? p.poster}
              alt={p.cover?.alt[locale] ?? ''}
              fill
              sizes="(min-width: 40rem) 38rem, 100vw"
              quality={75}
              priority
            />
          </div>
          <div>
          <h1 className={styles.title}>{p.title[locale]}</h1>
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <p className={styles.summary}>{p.summary[locale]}</p>
          <dl className={styles.details}>
            {details.map((d) => (
              <div key={d.label}>
                <dt>{d.label}</dt>
                <dd>{d.value}</dd>
              </div>
            ))}
          </dl>
          </div>
        </header>

        <aside className={styles.ticket} aria-label={t.perf.tickets}>
          <h2 className={styles.ticketTitle}>{t.perf.dates}</h2>
          {p.dates.length > 0 ? (
            <>
              <ul className={styles.dates}>
                {p.dates.map((d) => (
                  <li key={d.at}>
                    <span className={styles.dateIcon}>
                      <CalendarIcon />
                    </span>
                    <span className={styles.dateText}>
                      <time dateTime={d.at}>
                        {formatDate(d.at, locale)}, {formatTime(d.at)}
                      </time>
                      <span className={styles.venue}>{d.venue[locale]}</span>
                    </span>
                  </li>
                ))}
              </ul>
              {p.ticketUrl ? (
                <a className={`btn ${styles.buy}`} href={p.ticketUrl} target="_blank" rel="noopener noreferrer">
                  {t.perf.buy}
                </a>
              ) : (
                <Link className={`btn ${styles.buy}`} href={`/${locale}/contact`}>
                  {t.perf.tickets}
                </Link>
              )}
              <p className={styles.ticketInfo}>{p.ticketInfo[locale]}</p>
            </>
          ) : (
            <p className={styles.none}>{t.perf.noDates}</p>
          )}
        </aside>

        <div className={styles.more}>
          <section className={styles.people}>
            <div>
              <h2 className={styles.heading}>{t.perf.cast}</h2>
              <ul className={styles.names}>
                {p.cast.map((c, i) => (
                  <li key={i}>
                    {c.actor[locale]}
                    <span>{c.role[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={styles.heading}>{t.perf.team}</h2>
              <ul className={styles.names}>
                {p.team.map((c, i) => (
                  <li key={i}>
                    {c.name[locale]}
                    <span>{c.role[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {p.photos.length > 0 && (
            <section>
              <h2 className={styles.heading}>{t.perf.photos}</h2>
              <PhotoGrid
                compact
                photos={p.photos}
                title={p.title[locale]}
                strings={{ open: t.gallery.open, prev: t.gallery.prev, next: t.gallery.next, close: t.gallery.close }}
              />
            </section>
          )}

          {p.video && (
            <section>
              <h2 className={styles.heading}>{t.perf.video}</h2>
              <VideoFacade
                youtubeId={p.video.youtubeId}
                title={p.video.title[locale]}
                poster={p.video.poster}
                playLabel={t.gallery.play}
                sizes="(min-width: 56rem) 60vw, 100vw"
              />
            </section>
          )}

          <section>
            <h2 className={styles.heading}>{t.contact.address}</h2>
            <div className={styles.map}>
              <MapEmbed src={site.mapEmbed} title={t.contact.map} />
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
