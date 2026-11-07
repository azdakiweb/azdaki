'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales } from '@/i18n/config';
import styles from './Header.module.css';

export function LangSwitch({ label }: { label: string }) {
  const pathname = usePathname();
  const [, current, ...rest] = pathname.split('/');
  return (
    <nav className={styles.lang} aria-label={label}>
      {locales.map((l, i) => (
        <span key={l}>
          {i > 0 && <span aria-hidden>/ </span>}
          <Link
            href={`/${[l, ...rest].join('/')}`}
            hrefLang={l}
            lang={l}
            aria-current={l === current ? 'true' : undefined}
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </nav>
  );
}
