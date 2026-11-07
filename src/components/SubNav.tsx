'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, ArrowRight } from './Icons';
import styles from './SubNav.module.css';

type Props = {
  links: { href: string; label: string }[];
  label: string;
  variant: 'tabs' | 'side';
};

const pad = (n: number) => String(n).padStart(2, '0');

export function SubNav({ links, label, variant }: Props) {
  const pathname = usePathname();
  const index = Math.max(0, links.findIndex((link) => link.href === pathname));
  const prev = links[(index - 1 + links.length) % links.length];
  const next = links[(index + 1) % links.length];

  return (
    <nav aria-label={label} className={styles[variant]}>
      {/* Phones: the current section between two arrows, with a segment bar showing the position. */}
      {variant === 'side' && (
        <div className={styles.stepper}>
          <div className={styles.stepperRow}>
            <p className={styles.current} aria-current="page">
              <span className={styles.count}>
                {pad(index + 1)} / {pad(links.length)}
              </span>
              <span className={styles.currentLabel}>{links[index].label}</span>
            </p>
            <div className={styles.steps}>
              <Link href={prev.href} className={styles.step} aria-label={prev.label}>
                <ArrowLeft />
              </Link>
              <Link href={next.href} className={styles.step} aria-label={next.label}>
                <ArrowRight />
              </Link>
            </div>
          </div>
          <div className={styles.segments} aria-hidden>
            {links.map((link, i) => (
              <span key={link.href} data-active={i === index || undefined} />
            ))}
          </div>
        </div>
      )}

      <ul>
        {links.map((link, i) => (
          <li key={link.href}>
            <Link href={link.href} aria-current={pathname === link.href ? 'page' : undefined}>
              {variant === 'side' && <span className={styles.n}>{pad(i + 1)}</span>}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
