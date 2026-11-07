'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useRef, type MouseEvent } from 'react';
import type { NavEntry } from '@/lib/routes';
import styles from './Header.module.css';

const REOPEN_AFTER = 1000;

const isActive = (pathname: string, href: string) =>
  href.split('/').length === 2 ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

/*
 * Submenus open with CSS on hover and keyboard focus. A mouse click folds the submenu so
 * it doesn't cover the page just opened; it unfolds again if the pointer stays for a second.
 * This is a data attribute on the item rather than state, so it causes no render.
 */
export function MainNav({ items, label }: { items: NavEntry[]; label: string }) {
  const pathname = usePathname();
  const timer = useRef(0);

  const fold = useCallback((e: MouseEvent<HTMLLIElement>) => {
    if (e.detail === 0) return; // Keyboard activation: keep the menu reachable.
    const item = e.currentTarget;
    item.dataset.folded = 'true';
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => delete item.dataset.folded, REOPEN_AFTER);
  }, []);

  const unfold = useCallback((e: MouseEvent<HTMLLIElement>) => {
    window.clearTimeout(timer.current);
    delete e.currentTarget.dataset.folded;
  }, []);

  return (
    <nav className={styles.nav} aria-label={label}>
      <ul className={styles.navList}>
        {items.map((item) => (
          <li key={item.href} className={styles.navItem} onClick={fold} onMouseLeave={unfold}>
            <Link
              href={item.href}
              className={styles.navLink}
              data-active={isActive(pathname, item.href) || undefined}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
            {item.children && (
              <ul className={styles.sub}>
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link href={child.href} aria-current={pathname === child.href ? 'page' : undefined}>
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
