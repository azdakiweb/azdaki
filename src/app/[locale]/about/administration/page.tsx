import type { Metadata } from 'next';
import { PersonCard } from '@/components/Cards';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { getAbout } from '@/lib/api';
import { pageMeta, resolveLocale, type LocaleParams } from '@/lib/page';
import styles from '../about.module.css';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMeta(locale, '/about/administration', getDictionary(locale).about.administration) : {};
}

export default async function Administration({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const { administration } = await getAbout();
  return (
    <section>
      <h2 className={styles.h2}>{t.about.administration}</h2>
      <div className={styles.people}>
        {administration.map((p, i) => (
          <PersonCard key={i} person={p} locale={locale} />
        ))}
      </div>
    </section>
  );
}
