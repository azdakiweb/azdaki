'use client';

import { Children, useCallback, useMemo, useState, type ReactNode } from 'react';
import { SelectMenu } from './Dropdown';
import styles from './NewsSort.module.css';

type Props = {
  noun: string;
  sortLabel: string;
  newest: string;
  oldest: string;
  listClassName: string;
  /** The rendered cards, newest first. */
  children: ReactNode;
};

/* The cards are rendered on the server; choosing an order only moves them, with no request or new images. */
export function NewsSort({ noun, sortLabel, newest, oldest, listClassName, children }: Props) {
  const [reversed, setReversed] = useState(false);
  const cards = Children.toArray(children);
  const onSelect = useCallback((i: number) => setReversed(i === 1), []);
  const options = useMemo(() => [newest, oldest], [newest, oldest]);

  return (
    <>
      <div className={styles.head}>
        <h2 className={styles.title}>
          <span className={styles.count}>{cards.length}</span> {noun}
        </h2>
        <SelectMenu label={sortLabel} options={options} selected={reversed ? 1 : 0} onSelect={onSelect} />
      </div>
      <div className={listClassName}>{reversed ? [...cards].reverse() : cards}</div>
    </>
  );
}
