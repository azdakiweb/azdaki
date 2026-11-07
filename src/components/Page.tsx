import type { ReactNode } from 'react';
import { AudienceArt } from './AudienceArt';
import { LinkMenu } from './Dropdown';
import { StageArt } from './StageArt';
import { SubNav } from './SubNav';
import styles from './Page.module.css';

export function PageHead({ label, title, intro, art = 'stage', folds = false }: { label?: string; title: string; intro?: string; art?: 'stage' | 'audience' | ReactNode; folds?: boolean }) {
  return (
    <header className={`on-dark ${styles.head}`}>
      {art === 'audience' && <AudienceArt className={`${styles.stage} ${styles.stageAudience}`} />}
      {art && art !== 'stage' && art !== 'audience' && <div className={`${styles.stage} ${styles.stageAudience} ${styles.stageCustom} ${folds ? styles.stageFolds : ''}`}>{art}</div>}
      {art === 'stage' && <StageArt className={styles.stage} />}
      {label && <p className={`label ${styles.label}`}>{label}</p>}
      <h1 className={styles.title}>{title}</h1>
      {intro && <p className={styles.intro}>{intro}</p>}
    </header>
  );
}

/** The count heading with either joined tabs or a dropdown, for the performances and gallery sections. */
export function Tabs({ links, label, count, noun, menu = false }: { links: { href: string; label: string }[]; label: string; count: number; noun: string; menu?: boolean }) {
  return (
    <div className={styles.tabs}>
      <h2 className={styles.tabsTitle}>
        <span className={styles.tabsCount}>{count}</span> {noun}
      </h2>
      {menu ? <LinkMenu links={links} label={label} /> : <SubNav links={links} label={label} variant="tabs" />}
    </div>
  );
}

export function Container({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
