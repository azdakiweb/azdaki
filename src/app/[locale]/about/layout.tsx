import type { ReactNode } from 'react';
import { PageHead } from '@/components/Page';
import { SubNav } from '@/components/SubNav';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { aboutLinks } from '@/lib/routes';
import styles from './about.module.css';

export default async function AboutLayout({ children, params }: LocaleParams & { children: ReactNode }) {
  const { locale, t } = await resolveLocale(params);
  return (
    <>
      <PageHead label={t.tagline} title={t.nav.about} />
      <div className={styles.layout}>
        <aside className={styles.aside}>
          <SubNav links={aboutLinks(locale, t)} label={t.nav.section} variant="side" />
        </aside>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}
