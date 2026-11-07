'use client';

import Image from 'next/image';
import Link from 'next/link';
import { memo, useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { motionAllowed } from '@/lib/motion';
import { ArrowLeft, ArrowRight } from './Icons';
import styles from './Hero.module.css';

export type HeroSlide = {
  href: string;
  meta: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
};

type Strings = { label: string; prev: string; next: string; view: string };

const INTERVAL = 7000;

/*
 * `children` is the server-rendered stage block (name and figures). The slides advance
 * on their own but wait while the pointer or keyboard focus is inside, and stop entirely
 * for anyone whose system asks to reduce motion.
 */
export function HeroSlides({ slides, strings, children }: { slides: HeroSlide[]; strings: Strings; children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [seen, setSeen] = useState(0);
  const [announce, setAnnounce] = useState(false);
  const engaged = useRef(false);
  const badge = useRef<HTMLSpanElement>(null);
  const count = slides.length;

  const go = useCallback(
    (step: number) => {
      setIndex((i) => {
        const next = (i + step + count) % count;
        setSeen((s) => Math.max(s, next));
        return next;
      });
    },
    [count],
  );
  const prev = useCallback(() => {
    setAnnounce(true);
    go(-1);
  }, [go]);
  const next = useCallback(() => {
    setAnnounce(true);
    go(1);
  }, [go]);

  useEffect(() => {
    if (count < 2) return;
    const id = window.setInterval(() => {
      if (!engaged.current && !document.hidden && motionAllowed()) go(1);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [count, go]);

  const moveBadge = useCallback((e: PointerEvent<HTMLAnchorElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    if (badge.current) {
      badge.current.style.transform = `translate(${e.clientX - box.left}px, ${e.clientY - box.top}px)`;
    }
  }, []);

  const slide = slides[index];

  return (
    <div
      className={styles.stage}
      role="group"
      aria-roledescription="carousel"
      aria-label={strings.label}
      onPointerEnter={() => (engaged.current = true)}
      onPointerLeave={() => (engaged.current = false)}
      onFocus={(e) => (engaged.current = e.target.matches(':focus-visible'))}
      onBlur={() => (engaged.current = false)}
    >
      <div className={styles.panel}>
        <div className={styles.scene}>{children}</div>

        <div className={styles.news} aria-live={announce ? 'polite' : 'off'}>
          <div className={styles.copy} key={index}>
            <p className={`label ${styles.meta}`}>{slide.meta}</p>
            <h2 className={styles.slideTitle}>
              <Link href={slide.href}>{slide.title}</Link>
            </h2>
            <p className={styles.excerpt}>{slide.excerpt}</p>
          </div>
        </div>

        {count > 1 && <Controls index={index} count={count} strings={strings} onPrev={prev} onNext={next} />}
      </div>

      <div className={styles.media}>
        {/*
          The whole photo opens the performance; the title link is the one for keyboards and
          screen readers. A round "view" badge follows the pointer, moved directly without state.
        */}
        <Link href={slide.href} className={styles.mediaLink} tabIndex={-1} aria-hidden onPointerMove={moveBadge} onPointerEnter={moveBadge}>
          <span ref={badge} className={styles.badge}>
            <span>{strings.view}</span>
          </span>
        </Link>
        {slides.map((s, i) =>
          /* Only the visited slides and the upcoming one mount, so unseen images never load. */
          i <= seen + 1 ? (
            <Image
              key={s.image}
              src={s.image}
              alt={i === index ? s.alt : ''}
              fill
              sizes="(min-width: 56rem) 60vw, 160vw"
              priority={i === 0}
              quality={75}
              className={styles.image}
              data-active={i === index || undefined}
            />
          ) : null,
        )}
      </div>
    </div>
  );
}

type ControlsProps = {
  index: number;
  count: number;
  strings: Strings;
  onPrev: () => void;
  onNext: () => void;
};

const Controls = memo(function Controls({ index, count, strings, onPrev, onNext }: ControlsProps) {
  return (
    <div className={styles.controls}>
      <p className={styles.counter}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span className={styles.total}>/ {String(count).padStart(2, '0')}</span>
      </p>
      <div className={styles.buttons}>
        <button type="button" onClick={onPrev} aria-label={strings.prev}>
          <ArrowLeft />
        </button>
        <button type="button" onClick={onNext} aria-label={strings.next}>
          <ArrowRight />
        </button>
      </div>
    </div>
  );
});
