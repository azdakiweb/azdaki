'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronDown } from './Icons';
import styles from './Dropdown.module.css';

type ShellProps = { label: string; value: string; children: (close: () => void) => ReactNode };

/* Its open state lives here, so opening the list re-renders nothing around it. */
function Dropdown({ label, value, children }: ShellProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };

  return (
    <div
      ref={root}
      className={styles.menu}
      onBlur={(e) => {
        if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        className={styles.trigger}
        aria-label={`${label}: ${value}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {value}
        <ChevronDown />
      </button>
      {open && <ul className={styles.options}>{children(close)}</ul>}
    </div>
  );
}

type SelectProps = { label: string; options: string[]; selected: number; onSelect: (i: number) => void };

/** Chooses one option on this page, such as a sort order. */
export const SelectMenu = memo(function SelectMenu({ label, options, selected, onSelect }: SelectProps) {
  return (
    <Dropdown label={label} value={options[selected]}>
      {(close) =>
        options.map((option, i) => (
          <li key={option}>
            <button
              type="button"
              aria-pressed={i === selected}
              onClick={() => {
                onSelect(i);
                close();
              }}
            >
              {option}
            </button>
          </li>
        ))
      }
    </Dropdown>
  );
});

/** Moves between sibling pages. */
export function LinkMenu({ label, links }: { label: string; links: { href: string; label: string }[] }) {
  const pathname = usePathname();
  const current = links.find((link) => link.href === pathname) ?? links[0];
  return (
    <nav aria-label={label}>
      <Dropdown label={label} value={current.label}>
        {(close) =>
          links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} aria-current={link === current ? 'page' : undefined} onClick={close}>
                {link.label}
              </Link>
            </li>
          ))
        }
      </Dropdown>
    </nav>
  );
}
