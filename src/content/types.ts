import type { L } from '@/i18n/config';

export type Video = { title: L; youtubeId: string; poster?: string };

export type Performance = {
  slug: string;
  title: L;
  author: L;
  director: L;
  genre: L;
  durationMin: number;
  age: string;
  summary: L;
  cast: { actor: L; role: L }[];
  team: { role: L; name: L }[];
  /** ISO 8601, e.g. 2026-11-21T19:00:00 */
  dates: { at: string; venue: L }[];
  ticketInfo: L;
  ticketUrl?: string;
  poster: string;
  /** A wide stage photo. Performances that have one appear in the home-page hero. */
  cover?: { src: string; alt: L };
  photos: string[];
  video?: Video;
};

export type NewsItem = {
  slug: string;
  date: string;
  title: L;
  excerpt: L;
  body: L[];
  image: string;
  imageAlt: L;
  photos: string[];
  performanceSlug?: string;
};

/** uploadedAt is an ISO date; galleries are ordered by it, newest first. */
export type GalleryPhoto = { src: string; uploadedAt: string };

export type GalleryVideo = Video & { uploadedAt: string };

export type Album = { slug: string; title: L; date: string; photos: GalleryPhoto[] };

export type Person = { name: L; role?: L; bio?: L; photo?: string };

export type Partner = { name: L; url?: string; logo?: string };

export type SiteSettings = {
  address: L;
  phone: string;
  email: string;
  socials: { label: string; url: string }[];
  mapEmbed: string;
  mapLink: string;
};
