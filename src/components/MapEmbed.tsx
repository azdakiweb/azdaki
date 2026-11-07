import styles from './MapEmbed.module.css';

export function MapEmbed({ src, title }: { src: string; title: string }) {
  return (
    <div className={styles.map}>
      <iframe src={src} title={title} loading="lazy" className={styles.iframe} />
    </div>
  );
}
