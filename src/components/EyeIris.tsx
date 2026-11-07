'use client';

import { useEffect, useRef } from 'react';
import { motionAllowed } from '@/lib/motion';
import styles from './Hero.module.css';

const CX = 360;
const CY = 94;
const R = 30;
const REST_Y = -6; // At rest the iris sits against the upper lid, as in the logo.
const MAX_X = 46;
const MAX_Y = 12;
const FULL_REACH = 320; // Pointer distance in px at which the iris reaches its limit.

/*
 * Follows the pointer by writing the transform directly, with no React state, so tracking
 * never causes a render. It only listens while the hero is on screen.
 */
export function EyeIris() {
  const ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const iris = ref.current;
    if (!iris) return;
    let frame = 0;
    let x = 0;
    let y = 0;

    const update = () => {
      frame = 0;
      if (!motionAllowed()) {
        iris.style.transform = `translate(0px, ${REST_Y}px)`;
        return;
      }
      const box = iris.ownerSVGElement!.getBoundingClientRect();
      const scale = Math.min(box.width / 720, box.height / 300);
      // The drawing is centred horizontally and stands on the bottom of the svg box.
      const eyeX = box.left + box.width / 2;
      const eyeY = box.bottom - (300 - CY) * scale;
      const dx = x - eyeX;
      const dy = y - eyeY;
      const distance = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, distance / FULL_REACH);
      iris.style.transform = `translate(${(dx / distance) * MAX_X * reach}px, ${(dy / distance) * MAX_Y * reach}px)`;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };

    let listening = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting === listening) return;
      listening = entry.isIntersecting;
      if (listening) window.addEventListener('pointermove', onMove, { passive: true });
      else window.removeEventListener('pointermove', onMove);
    });
    observer.observe(iris.ownerSVGElement!);

    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <circle
      ref={ref}
      className={styles.iris}
      cx={CX}
      cy={CY}
      r={R}
      fill="var(--paper)"
      style={{ transform: `translate(0px, ${REST_Y}px)` }}
    />
  );
}
