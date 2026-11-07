import type { Metadata } from 'next';
import { PersonCard } from '@/components/Cards';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { getAbout } from '@/lib/api';
import { pageMeta, resolveLocale, type LocaleParams } from '@/lib/page';
import styles from '../about.module.css';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMeta(locale, '/about/creative-team', getDictionary(locale).about.creativeTeam) : {};
}

export default async function CreativeTeam({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const { creativeTeam } = await getAbout();
  return (
    <section>
      <h2 className={styles.h2}>{t.about.creativeTeam}</h2>
      <div className={styles.people}>
        {creativeTeam.map((p, i) => (
          <PersonCard key={i} person={p} locale={locale} />
        ))}
      </div>
    </section>
  );
}
