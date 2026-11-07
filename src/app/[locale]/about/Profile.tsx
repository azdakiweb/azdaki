import Image from 'next/image';
import type { Locale } from '@/i18n/config';
import type { Person } from '@/content/types';
import styles from './about.module.css';

export function Profile({ person, locale }: { person: Person; locale: Locale }) {
  return (
    <article className={styles.profile}>
      <div className={`frame ${styles.profilePhoto}`}>
        {person.photo && <Image src={person.photo} alt="" fill sizes="(min-width: 56rem) 208px, 112px" quality={75} priority />}
      </div>
      <div className={styles.profileHead}>
        <h2>{person.name[locale]}</h2>
        {person.role && <p className={styles.profileRole}>{person.role[locale]}</p>}
      </div>
      {person.bio && <p className={styles.profileBio}>{person.bio[locale]}</p>}
    </article>
  );
}
