'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { memo, useCallback, useState } from 'react';
import styles from './PhotoGrid.module.css';

export type LightboxStrings = { open: string; prev: string; next: string; close: string };

/* The viewer's code is only fetched when the first photo is opened. */
const Lightbox = dynamic(() => import('./Lightbox'), { ssr: false });

export function PhotoGrid({ photos, title, strings, compact = false }: { photos: string[]; title: string; strings: LightboxStrings; compact?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const onClose = useCallback(() => setOpen(null), []);
  return (
    <>
      <Thumbs photos={photos} title={title} openLabel={strings.open} onOpen={setOpen} compact={compact} />
      {open !== null && <Lightbox photos={photos} start={open} title={title} strings={strings} onClose={onClose} />}
    </>
  );
}

type ThumbsProps = { photos: string[]; title: string; openLabel: string; onOpen: (i: number) => void; compact: boolean };

/* Memoised so opening or paging the viewer never re-renders the thumbnails. */
const Thumbs = memo(function Thumbs({ photos, title, openLabel, onOpen, compact }: ThumbsProps) {
  return (
    <ul className={compact ? styles.compact : styles.grid}>
      {photos.map((src, i) => (
        <li key={`${src}-${i}`} className={styles.cell}>
          <button
            type="button"
            className={`frame ${styles.thumb}`}
            aria-label={`${openLabel}: ${title}, ${i + 1}`}
            onClick={() => onOpen(i)}
          >
            <Image src={src} alt="" fill sizes="(min-width: 56rem) 55vw, 100vw" quality={75} />
          </button>
        </li>
      ))}
    </ul>
  );
});
