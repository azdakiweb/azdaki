import Image from 'next/image';
import Link from 'next/link';
import type { Performance } from '@/content/types';
import { formatDate, type Locale } from '@/i18n/config';
import styles from './PerformanceCard.module.css';

/* The same look as the home-page panels: a clean photo with the details under it on the page background. */
export function PerformanceCard({ p, locale, eager = false }: { p: Performance; locale: Locale; eager?: boolean }) {
  return (
    <Link href={`/${locale}/performances/${p.slug}`} className={styles.card}>
      <div className={styles.photo}>
        <Image src={p.poster} alt="" fill sizes="(min-width: 72rem) 40vw, (min-width: 40rem) 70vw, 100vw" quality={75} loading={eager ? 'eager' : 'lazy'} />
      </div>
      <p className={styles.date}>{p.dates[0] ? formatDate(p.dates[0].at, locale) : p.genre[locale]}</p>
      <h3 className={styles.title}>{p.title[locale]}</h3>
      <p className={styles.summary}>{p.summary[locale]}</p>
    </Link>
  );
}
