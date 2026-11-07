'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { motionAllowed } from '@/lib/motion';
import { ArrowLeft, ArrowRight } from './Icons';
import styles from './NowPlaying.module.css';

const DRAG_THRESHOLD = 5;

type Props = { title: ReactNode; prevLabel: string; nextLabel: string; children: ReactNode };

/*
 * The panels scroll natively (swipe, trackpad, keyboard focus); this adds arrows and mouse dragging.
 * Their disabled state and the mouse drag write to the DOM directly, so neither causes a render.
 */
export function NowSlider({ title, prevLabel, nextLabel, children }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const prev = useRef<HTMLButtonElement>(null);
  const next = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (prev.current) prev.current.disabled = el.scrollLeft < 2;
      if (next.current) next.current.disabled = el.scrollLeft + el.clientWidth > el.scrollWidth - 2;
    };
    const onChange = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    el.addEventListener('scroll', onChange, { passive: true });
    window.addEventListener('resize', onChange, { passive: true });

    /* Dragging with the mouse. Touch and trackpads already scroll natively. */
    let startX = 0;
    let startScroll = 0;
    let dragged = false;
    let settle = 0;

    const onMove = (e: PointerEvent) => {
      const distance = e.clientX - startX;
      if (!dragged && Math.abs(distance) < DRAG_THRESHOLD) return;
      if (!dragged) {
        dragged = true;
        el.dataset.dragging = 'true';
      }
      el.scrollLeft = startScroll - distance;
    };

    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      if (!dragged) return;
      // Glide to the nearest panel, then give control back to the browser's snapping.
      const panels = [...el.children] as HTMLElement[];
      const inset = parseFloat(getComputedStyle(el).paddingLeft);
      const targetOf = (panel: HTMLElement) => panel.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft - inset;
      const nearest = panels.reduce((best, panel) =>
        Math.abs(targetOf(panel) - el.scrollLeft) < Math.abs(targetOf(best) - el.scrollLeft) ? panel : best,
      );
      el.scrollTo({ left: targetOf(nearest), behavior: motionAllowed() ? 'smooth' : 'auto' });
      settle = window.setTimeout(() => delete el.dataset.dragging, 400);
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      window.clearTimeout(settle);
      delete el.dataset.dragging;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      dragged = false;
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    };

    // A drag must not also count as a click on the link under the pointer.
    const onClick = (e: MouseEvent) => {
      if (dragged) {
        e.preventDefault();
        e.stopPropagation();
        dragged = false;
      }
    };
    const onNativeDrag = (e: DragEvent) => e.preventDefault();

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('click', onClick, true);
    el.addEventListener('dragstart', onNativeDrag);

    return () => {
      el.removeEventListener('scroll', onChange);
      window.removeEventListener('resize', onChange);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('click', onClick, true);
      el.removeEventListener('dragstart', onNativeDrag);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.clearTimeout(settle);
      cancelAnimationFrame(frame);
    };
  }, []);

  const step = (direction: number) => {
    const el = track.current;
    const panel = el?.firstElementChild as HTMLElement | null;
    if (!el || !panel) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (panel.offsetWidth + gap), behavior: motionAllowed() ? 'smooth' : 'auto' });
  };

  return (
    <>
      <div className={styles.head}>
        {title}
        <div className={styles.buttons}>
          <button ref={prev} type="button" aria-label={prevLabel} onClick={() => step(-1)}>
            <ArrowLeft />
          </button>
          <button ref={next} type="button" aria-label={nextLabel} onClick={() => step(1)}>
            <ArrowRight />
          </button>
        </div>
      </div>
      <div ref={track} className={styles.track}>
        {children}
      </div>
    </>
  );
}
