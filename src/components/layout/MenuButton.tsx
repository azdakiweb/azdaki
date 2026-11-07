'use client';

import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import type { NavEntry } from '@/lib/routes';
import { Burger } from '../Icons';
import styles from './Header.module.css';

/* The drawer's code is only fetched the first time someone opens it. */
const MobileMenu = dynamic(() => import('./MobileMenu'), { ssr: false });

export function MenuButton({ items, menu, close, credit, creditAfter }: { items: NavEntry[]; menu: string; close: string; credit: string; creditAfter: string }) {
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => setOpen(false), []);
  return (
    <>
      <button type="button" className={styles.menuBtn} aria-label={menu} aria-haspopup="dialog" onClick={() => setOpen(true)}>
        <Burger />
      </button>
      {open && <MobileMenu items={items} closeLabel={close} creditLabel={credit} creditAfter={creditAfter} onClose={onClose} />}
    </>
  );
}
