import Image from 'next/image';
import Link from 'next/link';
import type { NewsItem } from '@/content/types';
import { formatDate, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionary';
import styles from './HomeNews.module.css';

/* The newest item leads with a large photo; the next ones run beside it as a short list. */
export function HomeNews({ items, locale, t, titleId }: { items: NewsItem[]; locale: Locale; t: Dictionary; titleId: string }) {
  const [lead, ...rest] = items;
  if (!lead) return null;

  const href = (n: NewsItem) => `/${locale}/news/${n.slug}`;

  return (
    <>
      <div className={styles.head}>
        <h2 id={titleId} className={styles.heading}>
          {t.news.latest}
        </h2>
        <Link href={`/${locale}/news`} className={`arrow ${styles.all} ${styles.allTop}`}>
          {t.news.all}
        </Link>
      </div>

      <div className={styles.grid}>
        <article className={styles.lead}>
          <Link href={href(lead)} className={styles.leadLink}>
            <div className={styles.leadPhoto}>
              <Image src={lead.image} alt={lead.imageAlt[locale]} fill sizes="(min-width: 56rem) 56vw, 100vw" quality={75} />
            </div>
            <p className={styles.meta}>{formatDate(lead.date, locale)}</p>
            <h3 className={styles.leadTitle}>{lead.title[locale]}</h3>
            <p className={styles.excerpt}>{lead.excerpt[locale]}</p>
          </Link>
        </article>

        <ul className={styles.list}>
          {rest.map((n) => (
            <li key={n.slug}>
              <Link href={href(n)} className={styles.item}>
                <div className={styles.itemText}>
                  <p className={styles.meta}>{formatDate(n.date, locale)}</p>
                  <h3 className={styles.itemTitle}>{n.title[locale]}</h3>
                </div>
                <div className={styles.thumb}>
                  <Image src={n.image} alt="" fill sizes="(min-width: 56rem) 12vw, 30vw" quality={75} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Link href={`/${locale}/news`} className={`arrow ${styles.all} ${styles.allBottom}`}>
        {t.news.all}
      </Link>
    </>
  );
}
