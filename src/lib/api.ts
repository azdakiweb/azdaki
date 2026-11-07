/*
 * The single seam between the UI and the data source.
 *
 * Every page reads through these async functions, so connecting the Node backend
 * means rewriting only this file, e.g.:
 *
 *   export const getNews = () =>
 *     fetch(`${process.env.API_URL}/news`, { next: { revalidate: 60 } }).then((r) => r.json());
 *
 * The expected shapes are in src/content/types.ts.
 */
import * as about from '@/content/about';
import { albums, videos } from '@/content/gallery';
import type { Album } from '@/content/types';
import { news } from '@/content/news';
import { performances } from '@/content/performances';
import { site } from '@/content/site';

const byDateDesc = <T extends { date: string }>(a: T, b: T) => b.date.localeCompare(a.date);

export const getPerformances = async () => performances;

/** Performances with upcoming dates. */
export const getCurrentPerformances = async () => performances.filter((p) => p.dates.length > 0);

export const getPerformance = async (slug: string) => performances.find((p) => p.slug === slug);

export const getNews = async () => [...news].sort(byDateDesc);

export const getHeroPerformances = async () => performances.filter((p) => p.cover);

export const getNewsItem = async (slug: string) => news.find((n) => n.slug === slug);

const byUploadDesc = <T extends { uploadedAt: string }>(a: T, b: T) => b.uploadedAt.localeCompare(a.uploadedAt);

const withSortedPhotos = (album: Album): Album => ({ ...album, photos: [...album.photos].sort(byUploadDesc) });

/** Albums newest first, each with its photos by upload date, newest first. */
export const getAlbums = async () => [...albums].sort(byDateDesc).map(withSortedPhotos);

export const getAlbum = async (slug: string) => {
  const album = albums.find((a) => a.slug === slug);
  return album && withSortedPhotos(album);
};

/** Videos by upload date, newest first. */
export const getVideos = async () => [...videos].sort(byUploadDesc);

export const getAbout = async () => about;

export const getSponsors = async () => about.sponsors;

export const getSite = async () => site;
