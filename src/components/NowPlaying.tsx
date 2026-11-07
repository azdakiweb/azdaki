import Image from 'next/image';
import Link from 'next/link';
import type { Performance } from '@/content/types';
import { formatDate, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionary';
import { ArrowRight } from './Icons';
import { Mark } from './Logo';
import { NowSlider } from './NowSlider';
import styles from './NowPlaying.module.css';

/*
 * A horizontal strip of edge-to-edge photo panels, with the next one peeking in. The panel
 * under the pointer or keyboard focus opens wider, which is CSS only. The panels themselves
 * are rendered on the server; only the slider's arrows and dragging run in the browser.
 */
export function NowPlaying({ items, locale, t, titleId }: { items: Performance[]; locale: Locale; t: Dictionary; titleId: string }) {
  return (
    <NowSlider
      prevLabel={t.home.prev}
      nextLabel={t.home.next}
      title={
        <h2 id={titleId} className={styles.heading}>
          {t.nav.performances}
        </h2>
      }
    >
      {items.map((p) => (
        <article key={p.slug} className={styles.panel}>
          <Link href={`/${locale}/performances/${p.slug}`} className={styles.link}>
            <div className={styles.photo}>
              <Image src={p.poster} alt="" fill sizes="(min-width: 56rem) 46vw, 84vw" quality={75} />
            </div>
            <div className={styles.caption}>
              <p className={styles.date}>{p.dates[0] ? formatDate(p.dates[0].at, locale) : p.genre[locale]}</p>
              <h3 className={styles.title}>{p.title[locale]}</h3>
              <p className={styles.summary}>{p.summary[locale]}</p>
            </div>
          </Link>
        </article>
      ))}
      <div className={styles.panel}>
        <Link href={`/${locale}/performances`} className={`on-dark ${styles.photo} ${styles.allCard}`}>
          <Mark className={styles.allMark} />
          <span className={styles.allText}>
            {t.perf.all}
            <ArrowRight />
          </span>
        </Link>
      </div>
    </NowSlider>
  );
}
