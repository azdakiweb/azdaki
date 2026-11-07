import type { Metadata } from 'next';
import { MailIcon, PhoneIcon, PinIcon, SocialIcon } from '@/components/Icons';
import { MapEmbed } from '@/components/MapEmbed';
import { PageHead } from '@/components/Page';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { getSite } from '@/lib/api';
import { pageMeta, resolveLocale, type LocaleParams } from '@/lib/page';
import styles from './contact.module.css';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMeta(locale, '/contact', getDictionary(locale).contact.title) : {};
}

export default async function Contact({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const site = await getSite();
  return (
    <>
      <PageHead label={t.tagline} title={t.contact.title} art={null} />
      <div className={styles.grid}>
        <div className={styles.panel}>
          <a className={styles.card} href={`tel:${site.phone.replace(/\s/g, '')}`}>
            <span className={styles.icon}>
              <PhoneIcon />
            </span>
            <span className={styles.cardText}>
              <span className={styles.cardLabel}>{t.contact.phone}</span>
              {site.phone}
            </span>
          </a>
          <a className={styles.card} href={`mailto:${site.email}`}>
            <span className={styles.icon}>
              <MailIcon />
            </span>
            <span className={styles.cardText}>
              <span className={styles.cardLabel}>{t.contact.email}</span>
              {site.email}
            </span>
          </a>
          <a className={styles.card} href={site.mapLink} target="_blank" rel="noopener noreferrer">
            <span className={styles.icon}>
              <PinIcon />
            </span>
            <span className={styles.cardText}>
              <span className={styles.cardLabel}>{t.contact.address}</span>
              {site.address[locale]}
            </span>
          </a>
          <ul className={styles.socials} aria-label={t.contact.social}>
            {site.socials.map((s) => (
              <li key={s.label}>
                <a className={styles.social} href={s.url} target="_blank" rel="noopener noreferrer">
                  <SocialIcon name={s.label} />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.map}>
          <MapEmbed src={site.mapEmbed} title={t.contact.map} />
        </div>
      </div>
    </>
  );
}
