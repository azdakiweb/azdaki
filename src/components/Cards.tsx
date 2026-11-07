import Image from 'next/image';
import Link from 'next/link';
import { formatDate, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionary';
import type { NewsItem, Person } from '@/content/types';
import { NewsSort } from './NewsSort';
import styles from './Cards.module.css';

/* Outlined cards with the photo on the left; with an odd count, the newest takes the full width. */
export function NewsList({ items, locale, t }: { items: NewsItem[]; locale: Locale; t: Dictionary }) {
  return (
    <NewsSort noun={t.news.noun} sortLabel={t.news.sort} newest={t.news.newest} oldest={t.news.oldest} listClassName={styles.newsList}>
      {items.map((item, i) => (
        <NewsCard key={item.slug} item={item} locale={locale} t={t} eager={i === 0} />
      ))}
    </NewsSort>
  );
}

function NewsCard({ item, locale, t, eager }: { item: NewsItem; locale: Locale; t: Dictionary; eager: boolean }) {
  return (
    <article className={styles.news}>
      <div className={`frame ${styles.newsImage}`}>
        <Image
          src={item.image}
          alt={item.imageAlt[locale]}
          fill
          sizes="(min-width: 80rem) 30vw, (min-width: 40rem) 45vw, 100vw"
          quality={75}
          loading={eager ? 'eager' : 'lazy'}
        />
      </div>
      <div className={styles.newsText}>
        <time dateTime={item.date} className={styles.newsDate}>
          {formatDate(item.date, locale)}
        </time>
        <h3 className={styles.newsTitle}>
          <Link href={`/${locale}/news/${item.slug}`}>{item.title[locale]}</Link>
        </h3>
        <p className={styles.newsExcerpt}>{item.excerpt[locale]}</p>
        <span className={`arrow ${styles.newsMore}`} aria-hidden>
          {t.news.read}
        </span>
      </div>
    </article>
  );
}

export function PersonCard({ person, locale }: { person: Person; locale: Locale }) {
  return (
    <article className={styles.person}>
      <div className={`frame ${styles.portrait}`}>
        {person.photo && (
          <Image src={person.photo} alt="" fill sizes="(min-width: 72rem) 20vw, (min-width: 36rem) 33vw, 50vw" quality={75} />
        )}
      </div>
      <h3 className={styles.personName}>{person.name[locale]}</h3>
      {person.role && <p className={styles.personRole}>{person.role[locale]}</p>}
      {person.bio && <p className={styles.personBio}>{person.bio[locale]}</p>}
    </article>
  );
}
