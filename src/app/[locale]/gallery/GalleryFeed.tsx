'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { memo, useCallback, useMemo, useState, type MouseEvent } from 'react';
import { Play } from '@/components/Icons';
import { Mark } from '@/components/Logo';
import type { LightboxStrings } from '@/components/PhotoGrid';
import type { GalleryPhoto } from '@/content/types';
import { VideoFacade } from '@/components/VideoFacade';
import styles from './gallery.module.css';

export type FeedAlbum = { slug: string; title: string; href: string; photos: GalleryPhoto[] };

export type FeedVideo = { youtubeId: string; title: string; poster?: string };

type VideoStrings = { label: string; play: string };

const VIDEOS = 'videos';

/* The viewer's code is only fetched when the first photo is opened. */
const Lightbox = dynamic(() => import('@/components/Lightbox'), { ssr: false });

type Props = { albums: FeedAlbum[]; videos: FeedVideo[]; allLabel: string; videoStrings: VideoStrings; strings: LightboxStrings };

/*
 * Round album covers over a tight grid of portrait photos. A cover filters the grid in place;
 * each is still a real link to the album's page, for new tabs and search engines.
 */
export function GalleryFeed({ albums, videos, allLabel, videoStrings, strings }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [viewing, setViewing] = useState<number | null>(null);

  /* Newest upload first, in "all" too. A photo in two albums appears once, at its newest date. */
  const photos = useMemo(() => {
    const shown = selected ? albums.filter((a) => a.slug === selected) : albums;
    const merged = shown
      .flatMap((a) => a.photos.map((p) => ({ ...p, album: a.title })))
      .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
    const seen = new Set<string>();
    return merged.filter((p) => !seen.has(p.src) && seen.add(p.src));
  }, [albums, selected]);
  const sources = useMemo(() => photos.map((p) => p.src), [photos]);
  const title = albums.find((a) => a.slug === selected)?.title ?? allLabel;

  const onClose = useCallback(() => setViewing(null), []);

  return (
    <>
      <Highlights
        albums={albums}
        allLabel={allLabel}
        videosLabel={videoStrings.label}
        selected={selected}
        onSelect={setSelected}
      />
      {selected === VIDEOS ? (
        <ul className={styles.feedVideos}>
          {videos.map((v) => (
            <li key={v.title}>
              <VideoFacade youtubeId={v.youtubeId} title={v.title} poster={v.poster} playLabel={videoStrings.play} />
              <h2 className={styles.feedVideoTitle}>{v.title}</h2>
            </li>
          ))}
        </ul>
      ) : (
        <Grid photos={photos} openLabel={strings.open} onOpen={setViewing} />
      )}
      {viewing !== null && <Lightbox photos={sources} start={viewing} title={title} strings={strings} onClose={onClose} />}
    </>
  );
}

type HighlightsProps = {
  albums: FeedAlbum[];
  allLabel: string;
  videosLabel: string;
  selected: string | null;
  onSelect: (slug: string | null) => void;
};

const Highlights = memo(function Highlights({ albums, allLabel, videosLabel, selected, onSelect }: HighlightsProps) {
  // Plain clicks filter in place; a modified click follows the link to the page, in a new tab.
  const filter = (e: MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    onSelect(slug);
  };

  return (
    <ul className={styles.highlights}>
      <li>
        <button type="button" className={styles.highlight} aria-pressed={selected === null} onClick={() => onSelect(null)}>
          <span className={styles.ring}>
            <span className={styles.ringAll}>
              <Mark className={styles.ringMark} />
            </span>
          </span>
          <span className={styles.highlightName}>{allLabel}</span>
        </button>
      </li>
      {albums.map((a) => (
        <li key={a.slug}>
          <a
            href={a.href}
            className={styles.highlight}
            aria-current={selected === a.slug ? 'true' : undefined}
            onClick={(e) => filter(e, a.slug)}
          >
            <span className={styles.ring}>
              <span className={`frame ${styles.ringPhoto}`}>
                <Image src={a.photos[0].src} alt="" fill sizes="10rem" quality={75} />
              </span>
            </span>
            <span className={styles.highlightName}>{a.title}</span>
          </a>
        </li>
      ))}
      <li>
        <button type="button" className={styles.highlight} aria-pressed={selected === VIDEOS} onClick={() => onSelect(VIDEOS)}>
          <span className={styles.ring}>
            <span className={styles.ringAll}>
              <Play />
            </span>
          </span>
          <span className={styles.highlightName}>{videosLabel}</span>
        </button>
      </li>
    </ul>
  );
});

type GridProps = { photos: { src: string; album: string }[]; openLabel: string; onOpen: (i: number) => void };

/* Memoised so opening or paging the viewer never re-renders the photos. */
const Grid = memo(function Grid({ photos, openLabel, onOpen }: GridProps) {
  return (
    <ul className={styles.feed}>
      {photos.map((p, i) => (
        <li key={p.src}>
          <button
            type="button"
            className={`frame ${styles.post}`}
            aria-label={`${openLabel}: ${p.album}, ${i + 1}`}
            onClick={() => onOpen(i)}
          >
            <Image
              src={p.src}
              alt=""
              fill
              sizes="(min-width: 64rem) 44rem, 64vw"
              quality={75}
              loading={i < 3 ? 'eager' : 'lazy'}
            />
            <span className={styles.postAlbum} aria-hidden>
              {p.album}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
});
