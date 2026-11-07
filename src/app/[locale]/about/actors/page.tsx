import type { Metadata } from 'next';
import { PersonCard } from '@/components/Cards';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { getAbout } from '@/lib/api';
import { pageMeta, resolveLocale, type LocaleParams } from '@/lib/page';
import styles from '../about.module.css';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMeta(locale, '/about/actors', getDictionary(locale).about.actors) : {};
}

export default async function Actors({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const { ownActors, guestActors } = await getAbout();
  const groups = [
    { title: t.about.ownActors, people: ownActors },
    { title: t.about.guestActors, people: guestActors },
  ];
  return (
    <>
      {groups.map((g) => (
        <section key={g.title} className={styles.group}>
          <h2 className={styles.h2}>{g.title}</h2>
          <div className={styles.people}>
            {g.people.map((p, i) => (
              <PersonCard key={i} person={p} locale={locale} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
