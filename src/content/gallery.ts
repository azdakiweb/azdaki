import type { Album, GalleryPhoto, GalleryVideo } from './types';

/* SAMPLE DATA. The sample video points at a public test clip; replace the IDs. */
const s = (n: number) => `/images/scenes/scene-${String(n).padStart(2, '0')}.webp`;

/* Sample upload dates: the first photo on the album's date, each next one a day earlier. */
const uploaded = (date: string, srcs: string[]): GalleryPhoto[] =>
  srcs.map((src, i) => ({
    src,
    uploadedAt: new Date(Date.parse(date) - i * 86400000).toISOString().slice(0, 10),
  }));

export const albums: Album[] = [
  {
    slug: 'me-vkhedav-mzes',
    title: { ka: 'მე ვხედავ მზეს', en: 'I See the Sun' },
    date: '2026-10-18',
    photos: uploaded('2026-10-18', ['/images/covers/hero-2.webp', s(3), s(7), s(8), s(4), s(9)]),
  },
  {
    slug: 'madloba-miqvarkhar-mapatie',
    title: { ka: 'მადლობა, მიყვარხარ, მაპატიე', en: 'Thank You, I Love You, Forgive Me' },
    date: '2026-11-01',
    photos: uploaded('2026-11-01', ['/images/covers/madloba.webp', s(1), s(5), s(2), s(10)]),
  },
  {
    slug: 'katsia-adamiani',
    title: { ka: 'კაცია-ადამიანი?!', en: 'Is He a Man?!' },
    date: '2026-09-01',
    photos: uploaded('2026-09-01', ['/images/covers/katsia-adamiani.webp', s(2), s(6)]),
  },
  {
    slug: 'repeticiebi',
    title: { ka: 'რეპეტიციები', en: 'Rehearsals' },
    date: '2026-03-20',
    photos: uploaded('2026-03-20', [s(6), s(9), s(2), s(5), s(7)]),
  },
  {
    slug: 'kulisebi',
    title: { ka: 'კულისებში', en: 'Backstage' },
    date: '2025-12-11',
    photos: uploaded('2025-12-11', [s(10), s(4), s(8)]),
  },
];

export const videos: GalleryVideo[] = [
  { title: { ka: '„მე ვხედავ მზეს“: ფრაგმენტი', en: 'I See the Sun: excerpt' }, youtubeId: 'aqz-KE-bpKQ', poster: s(3), uploadedAt: '2026-10-20' },
  { title: { ka: 'სიუჟეტი თეატრის შესახებ', en: 'A TV story about the theatre' }, youtubeId: 'aqz-KE-bpKQ', poster: s(6), uploadedAt: '2026-06-12' },
  { title: { ka: '„მადლობა, მიყვარხარ, მაპატიე“: ფრაგმენტი', en: 'Thank You, I Love You, Forgive Me: excerpt' }, youtubeId: 'aqz-KE-bpKQ', poster: s(1), uploadedAt: '2026-11-02' },
  { title: { ka: 'რეპეტიციიდან', en: 'From rehearsals' }, youtubeId: 'aqz-KE-bpKQ', poster: s(9), uploadedAt: '2026-03-22' },
];
