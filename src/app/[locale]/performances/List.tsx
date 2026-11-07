import { Container, PageHead, Tabs } from '@/components/Page';
import { PerformanceCard } from '@/components/PerformanceCard';
import type { Performance } from '@/content/types';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionary';
import { performanceLinks } from '@/lib/routes';
import styles from './performances.module.css';

export function PerformanceList({ items, noun, locale, t }: { items: Performance[]; noun: string; locale: Locale; t: Dictionary }) {
  return (
    <>
      <PageHead label={t.tagline} title={t.nav.performances} art="audience" />
      <Tabs menu links={performanceLinks(locale, t)} label={t.nav.section} count={items.length} noun={noun} />
      <Container>
        <ul className={styles.cards}>
          {items.map((p, i) => (
            <li key={p.slug}>
              <PerformanceCard p={p} locale={locale} eager={i === 0} />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
