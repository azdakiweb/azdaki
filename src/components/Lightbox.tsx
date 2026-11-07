'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Close } from './Icons';
import type { LightboxStrings } from './PhotoGrid';
import styles from './Lightbox.module.css';

type Props = { photos: string[]; start: number; title: string; strings: LightboxStrings; onClose: () => void };

export default function Lightbox({ photos, start, title, strings, onClose }: Props) {
  const [index, setIndex] = useState(start);
  const ref = useRef<HTMLDialogElement>(null);
  const count = photos.length;

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  const step = (d: number) => setIndex((i) => (i + d + count) % count);

  return (
    <dialog
      ref={ref}
      className={`${styles.box} on-dark`}
      aria-label={title}
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') step(1);
        if (e.key === 'ArrowLeft') step(-1);
      }}
    >
      <div className={styles.bar}>
        <p className={styles.caption}>
          {title} <span className={styles.count}>{index + 1} / {count}</span>
        </p>
        <button type="button" className={styles.btn} onClick={onClose} aria-label={strings.close}>
          <Close />
        </button>
      </div>
      <div className={styles.image}>
        <Image key={photos[index]} src={photos[index]} alt={`${title}, ${index + 1}`} fill sizes="100vw" quality={75} priority />
      </div>
      <div className={styles.nav}>
        <button type="button" className={styles.btn} onClick={() => step(-1)} aria-label={strings.prev}>
          <ArrowLeft />
        </button>
        <button type="button" className={styles.btn} onClick={() => step(1)} aria-label={strings.next}>
          <ArrowRight />
        </button>
      </div>
    </dialog>
  );
}
