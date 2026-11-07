import styles from './Logo.module.css';

/*
 * The artwork is drawn through a CSS mask from cached SVG files, so the long
 * vector paths are not repeated in the HTML of every page and it takes any colour.
 */
export function Mark({ className = '', label }: { className?: string; label?: string }) {
  return (
    <span
      className={`${styles.mark} ${className}`}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    />
  );
}

export function Wordmark({ className = '' }: { className?: string }) {
  return <span className={`${styles.wordmark} ${className}`} aria-hidden />;
}
