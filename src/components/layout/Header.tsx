import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionary';
import { mainNav } from '@/lib/routes';
import { Mark, Wordmark } from '../Logo';
import { MainNav } from './MainNav';
import { LangSwitch } from './LangSwitch';
import { MenuButton } from './MenuButton';
import styles from './Header.module.css';

export function Header({ locale, t }: { locale: Locale; t: Dictionary }) {
  const items = mainNav(locale, t);
  return (
    <header className={styles.header}>
      <Link href={`/${locale}`} className={styles.logo} aria-label={t.brand}>
        <Mark className={styles.mark} />
        {locale === 'ka' ? (
          <Wordmark className={styles.wordmark} />
        ) : (
          <span className={styles.textLogo}>{t.brand}</span>
        )}
      </Link>

      <MainNav items={items} label={t.nav.main} />

      <div className={styles.tools}>
        <LangSwitch label={t.lang.label} />
        <MenuButton credit={t.footer.madeBy} creditAfter={t.footer.madeByAfter} items={items} menu={t.nav.menu} close={t.nav.close} />
      </div>
    </header>
  );
}
