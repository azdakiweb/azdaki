import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionary';
import { getSite, getSponsors } from '@/lib/api';
import { CREDIT, mainNav } from '@/lib/routes';
import { GlobeIcon, SocialIcon } from '../Icons';
import { Mark } from '../Logo';
import styles from './Footer.module.css';

export async function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const [site, sponsors] = await Promise.all([getSite(), getSponsors()]);
  return (
    <footer>
      <section className={styles.sponsors} aria-label={t.footer.sponsors}>
        {/* The second, hidden copy follows the first, so the loop has no visible seam. CSS only. */}
        <div className={styles.marquee}>
          {[false, true].map((copy) => (
            <ul key={String(copy)} className={styles.sponsorList} aria-hidden={copy || undefined}>
              {sponsors.map((s, i) => (
                <li key={i} className={styles.sponsor}>
                  {s.name[locale]}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      <div className={`${styles.main} on-dark`}>
        <div className={styles.brand}>
          <Mark className={styles.mark} />
          <p className={styles.name}>{t.brand}</p>
          <p className="label">{t.tagline}</p>
        </div>

        <nav className={styles.col} aria-label={t.footer.sections}>
          <h2 className={`label ${styles.colTitle}`}>{t.footer.sections}</h2>
          <ul>
            {mainNav(locale, t).map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={`label ${styles.colTitle}`}>{t.contact.title}</h2>
          <address className={styles.address}>
            <p>{site.address[locale]}</p>
            <p>
              <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
            </p>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </address>
        </div>

        <div className={styles.col}>
          <h2 className={`label ${styles.colTitle}`}>{t.contact.social}</h2>
          <ul>
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className={styles.social}>
                  <SocialIcon name={s.label} />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.legal}>
          <p>
            © {new Date().getFullYear()} {t.brand}. {t.footer.rights}.
          </p>
          <p className={styles.madeBy}>
            <GlobeIcon />
            {t.footer.madeBy}{' '}
            <a href={CREDIT.url} target="_blank" rel="noopener noreferrer" className={styles.credit}>
              {CREDIT.name}
            </a>
            {t.footer.madeByAfter}
          </p>
        </div>
      </div>
    </footer>
  );
}
