'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CREDIT, type NavEntry } from '@/lib/routes';
import { ChevronDown, Close, GlobeIcon } from '../Icons';
import { Mark } from '../Logo';
import styles from './MobileMenu.module.css';

type Props = { items: NavEntry[]; closeLabel: string; creditLabel: string; creditAfter: string; onClose: () => void };

/* A short list on the page's own light background. Sections unfold one at a time. */
export default function MobileMenu({ items, closeLabel, creditLabel, creditAfter, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const isCurrent = (href: string) => pathname === href;
  const inSection = (item: NavEntry) => item.children?.some((child) => isCurrent(child.href)) ?? false;
  const [unfolded, setUnfolded] = useState<string | null>(() => items.find(inSection)?.href ?? null);

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  return (
    <dialog ref={ref} className={styles.menu} onClose={onClose}>
      <div className={styles.top}>
        <Mark className={styles.mark} />
        <button type="button" className={styles.close} aria-label={closeLabel} onClick={onClose}>
          <Close />
        </button>
      </div>
      <ul className={styles.list}>
        {items.map((item) => {
          const open = unfolded === item.href;
          return (
            <li key={item.href}>
              <div className={styles.row}>
                <Link
                  href={item.href}
                  className={styles.link}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                  data-section={inSection(item) || undefined}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    type="button"
                    className={styles.unfold}
                    aria-label={item.label}
                    aria-expanded={open}
                    onClick={() => setUnfolded(open ? null : item.href)}
                  >
                    <ChevronDown />
                  </button>
                )}
              </div>
              {item.children && open && (
                <ul className={styles.sub}>
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href} aria-current={isCurrent(child.href) ? 'page' : undefined} onClick={onClose}>
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <p className={styles.credit}>
        <GlobeIcon />
        {creditLabel}{' '}
        <a href={CREDIT.url} target="_blank" rel="noopener noreferrer">
          {CREDIT.name}
        </a>
        {creditAfter}
      </p>
    </dialog>
  );
}
