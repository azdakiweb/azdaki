'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Play } from './Icons';
import styles from './VideoFacade.module.css';

type Props = { youtubeId: string; title: string; poster?: string; playLabel: string; sizes?: string };

/*
 * Shows only a still until it is clicked. YouTube's player is heavy (hundreds of KB
 * of script) and sets cookies, so it loads on demand, from the no-cookie domain.
 */
export function VideoFacade({ youtubeId, title, poster, playLabel, sizes = '(min-width: 56rem) 50vw, 100vw' }: Props) {
  const [active, setActive] = useState(false);
  return (
    <div className={`frame ${styles.video}`}>
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className={styles.iframe}
        />
      ) : (
        <button type="button" className={styles.button} onClick={() => setActive(true)} aria-label={`${playLabel}: ${title}`}>
          <Image src={poster ?? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`} alt="" fill sizes={sizes} quality={75} />
          <span className={styles.play}>
            <Play />
          </span>
        </button>
      )}
    </div>
  );
}
