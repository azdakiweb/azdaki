'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { motionAllowed } from '@/lib/motion';
import { ArrowLeft, ArrowRight } from './Icons';
import { Mark } from './Logo';
import styles from './HomeGallery.module.css';

export type GallerySlide = { src: string; album: string; href: string; avatar: string };

type Strings = { title: string; all: string; allHref: string; prev: string; next: string; open: string; close: string };

const INTERVAL = 3000;
const REACH = 3; // Cards this far from the front stay mounted: two visible on a side, one waiting off stage.

/* The full-size viewer's code is only fetched when the first photo is opened. */
const Lightbox = dynamic(() => import('./Lightbox'), { ssr: false });

/*
 * In the manner of Instagram stories: tall photos on a dark band, the front one with segmented
 * progress bars and its album's round cover, the neighbours smaller and dimmed. The last story
 * leads to the full gallery. It advances while on screen, rests on keyboard focus or while a
 * photo is open, and stays still when the system asks to reduce motion.
 */
export function HomeGallery({ slides, strings, titleId }: { slides: GallerySlide[]; strings: Strings; titleId: string }) {
  const [index, setIndex] = useState(0);
  const [viewing, setViewing] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const onScreen = useRef(false);
  const engaged = useRef(false);
  const isViewing = useRef(false);

  const photos = useMemo(() => slides.map((s) => s.src), [slides]);
  const cardIndex = slides.length;
  const count = slides.length + 1;

  const go = useCallback(
    // Going back from the first photo lands on the last photo: the closing card only follows it.
    (step: number) => setIndex((i) => (i === 0 && step < 0 ? count - 2 : (i + step + count) % count)),
    [count],
  );
  const closeViewer = useCallback(() => {
    isViewing.current = false;
    setViewing(null);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      onScreen.current = entry.isIntersecting;
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Restarts on every change, so each story gets its full time, manual changes included. */
  useEffect(() => {
    const id = window.setInterval(() => {
      if (onScreen.current && !engaged.current && !isViewing.current && !document.hidden && motionAllowed()) go(1);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [go, index]);

  const open = (i: number) => {
    isViewing.current = true;
    setViewing(i);
  };

  // Each card's place from the front. Going forward passes the closing card; going back wraps from
  // the first photo straight to the last, so the closing card never sits to the left of a photo.
  const offsetOf = (i: number) => {
    const forward = (i - index + count) % count;
    if (i === cardIndex) return forward;
    const back = i <= index ? index - i : index + (cardIndex - i);
    return forward <= back ? forward : -back;
  };

  const progress = (
    <div className={styles.progress} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={styles.segment} data-state={i < index ? 'done' : i === index ? 'now' : undefined}>
          {i === index && <span key={index} className={styles.fill} style={{ animationDuration: `${INTERVAL}ms` }} />}
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={root}
      role="group"
      aria-roledescription="carousel"
      aria-labelledby={titleId}
      onFocus={(e) => (engaged.current = e.target.matches(':focus-visible'))}
      onBlur={() => (engaged.current = false)}
    >
      <div className={styles.head}>
        <h2 id={titleId} className={styles.heading}>
          {strings.title}
        </h2>
        <div className={styles.buttons}>
          <button type="button" aria-label={strings.prev} onClick={() => go(-1)}>
            <ArrowLeft />
          </button>
          <button type="button" aria-label={strings.next} onClick={() => go(1)}>
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className={`on-dark ${styles.band}`}>
        <div className={styles.stage}>
          {Array.from({ length: count }, (_, i) => i).map((i) => {
            const offset = offsetOf(i);
            if (Math.abs(offset) > REACH) return null;
            const front = offset === 0;
            const slide = slides[i];
            return (
              <div
                key={i}
                className={styles.story}
                style={{ '--offset': offset, '--side': Math.sign(offset), '--far': Math.abs(offset) } as CSSProperties}
                data-front={front || undefined}
                aria-hidden={!front || undefined}
              >
                {slide ? (
                  <>
                    <Image src={slide.src} alt={front ? `${slide.album}, ${i + 1}` : ''} fill sizes="(min-width: 56rem) 60vw, 180vw" quality={75} className={styles.photo} />
                    {front ? (
                      <button
                        type="button"
                        className={styles.open}
                        aria-label={`${strings.open}: ${slide.album}, ${i + 1}`}
                        onClick={() => open(i)}
                      />
                    ) : (
                      <button type="button" className={styles.open} tabIndex={-1} onClick={() => setIndex(i)} />
                    )}
                  </>
                ) : front ? (
                  <Link href={strings.allHref} className={styles.allCard}>
                    <Mark className={styles.allMark} />
                    <span className={styles.allText}>
                      {strings.all}
                      <ArrowRight />
                    </span>
                  </Link>
                ) : (
                  <button type="button" className={`${styles.open} ${styles.allSide}`} tabIndex={-1} onClick={() => setIndex(i)} />
                )}

                {front && (
                  <div className={styles.top}>
                    {progress}
                    {slide && (
                      <Link href={slide.href} className={styles.author}>
                        <span className={styles.avatar}>
                          <Image src={slide.avatar} alt="" fill sizes="4rem" quality={75} />
                        </span>
                        <span className={styles.authorName}>{slide.album}</span>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {viewing !== null && (
        <Lightbox
          photos={photos}
          start={viewing}
          title={strings.title}
          strings={{ open: strings.open, prev: strings.prev, next: strings.next, close: strings.close }}
          onClose={closeViewer}
        />
      )}
    </div>
  );
}
