import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { getAbout } from '@/lib/api';
import { pageMeta, resolveLocale, type LocaleParams } from '@/lib/page';
import { AchievementsIcon, FoundedIcon, GoalsIcon, TasksIcon, WhoIcon } from './HistoryIcons';
import styles from './about.module.css';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMeta(locale, '/about', getDictionary(locale).about.history) : {};
}

export default async function History({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const { history, mission } = await getAbout();
  return (
    <>
      <div className={`on-dark ${styles.intro}`}>
        <p className={styles.bigYear}>{history.year}</p>
        <p className={styles.lead}>{mission[locale]}</p>
      </div>
      <div className={styles.chapters}>
        <section className={styles.chapter}>
          <WhoIcon />
          <h2>{t.about.whoWeAre}</h2>
          <p>{history.whoWeAre[locale]}</p>
        </section>
        <section className={styles.chapter}>
          <FoundedIcon />
          <h2>{t.about.founded}</h2>
          <p>{history.founded[locale]}</p>
        </section>
        <section className={styles.chapter}>
          <GoalsIcon />
          <h2>{t.about.goals}</h2>
          <p>{history.goals[locale]}</p>
        </section>
        <section className={`${styles.chapter} ${styles.wide}`}>
          <TasksIcon />
          <h2>{t.about.tasks}</h2>
          <ul>
            {history.tasks.map((x, i) => (
              <li key={i}>{x[locale]}</li>
            ))}
          </ul>
        </section>
        <section className={`${styles.chapter} ${styles.wide}`}>
          <AchievementsIcon />
          <h2>{t.about.achievements}</h2>
          <ul>
            {history.achievements.map((x, i) => (
              <li key={i}>{x[locale]}</li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
