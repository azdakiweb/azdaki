import type { Performance } from './types';

/*
 * SAMPLE DATA. Titles come from the brief. Dates, cast, directors, durations and
 * the "name surname" entries are stand-ins until the theatre supplies real ones.
 */
const NAME = { ka: 'სახელი გვარი', en: 'Name Surname' };
const ROLE = { ka: 'როლის სახელი', en: 'Role name' };
const TBA = { ka: 'დაზუსტდება', en: 'To be confirmed' };
const VENUE = { ka: 'სცენის მისამართი დაზუსტდება', en: 'Venue to be confirmed' };
const TICKETS = {
  ka: 'ბილეთების შესახებ ინფორმაცია დაემატება. დაგვიკავშირდით ტელეფონით ან ელფოსტით.',
  en: 'Ticket details will be added here. Please contact us by phone or email.',
};

const team = [
  { role: { ka: 'რეჟისორი', en: 'Director' }, name: NAME },
  { role: { ka: 'მხატვარი', en: 'Set designer' }, name: NAME },
  { role: { ka: 'კომპოზიტორი', en: 'Composer' }, name: NAME },
  { role: { ka: 'ქორეოგრაფი', en: 'Choreographer' }, name: NAME },
];
const cast = Array.from({ length: 6 }, () => ({ actor: NAME, role: ROLE }));

export const performances: Performance[] = [
  {
    slug: 'madloba-miqvarkhar-mapatie',
    title: { ka: 'მადლობა, მიყვარხარ, მაპატიე', en: 'Thank You, I Love You, Forgive Me' },
    author: TBA,
    director: NAME,
    genre: { ka: 'დრამა', en: 'Drama' },
    durationMin: 60,
    age: '12+',
    summary: {
      ka: 'სპექტაკლის მოკლე აღწერა აქ დაემატება. ეს ტექსტი დროებითია და თეატრის მიერ მოწოდებული აღწერით შეიცვლება.',
      en: 'A short description of the performance will appear here. This is temporary text, to be replaced with the description supplied by the theatre.',
    },
    cast,
    team,
    dates: [
      { at: '2026-11-21T19:00:00', venue: VENUE },
      { at: '2026-12-05T19:00:00', venue: VENUE },
    ],
    ticketInfo: TICKETS,
    poster: '/images/covers/madloba.webp',
    cover: {
      src: '/images/covers/madloba.webp',
      alt: {
        ka: 'მსახიობები ფერად კოსტიუმებში ცეკვავენ სცენაზე, წინა პლანზე მსახიობი ლურჯი თავსაბურავით',
        en: 'Actors in colourful costumes dancing on stage, with an actor in a blue headdress in front',
      },
    },
    photos: ['/images/covers/madloba.webp', '/images/scenes/scene-01.webp', '/images/scenes/scene-05.webp'],
    video: {
      title: { ka: 'სპექტაკლის ფრაგმენტი', en: 'Excerpt' },
      youtubeId: 'aqz-KE-bpKQ',
      poster: '/images/covers/madloba.webp',
    },
  },
  {
    slug: 'me-vkhedav-mzes',
    title: { ka: 'მე ვხედავ მზეს', en: 'I See the Sun' },
    author: { ka: 'ნოდარ დუმბაძე', en: 'Nodar Dumbadze' },
    director: NAME,
    genre: { ka: 'დრამა', en: 'Drama' },
    durationMin: 75,
    age: '10+',
    summary: {
      ka: 'ნოდარ დუმბაძის რომანის მიხედვით: ომის წლების ქართული სოფელი, სოსოიასა და თვალისჩინდაკარგული ხათიას სიყვარული და რწმენა, რომ მზეს ყველა თავისებურად ხედავს.',
      en: "After the novel by Nodar Dumbadze: a Georgian village in the war years, the love between Sosoia and Khatia, who is losing her sight, and the belief that everyone sees the sun in their own way.",
    },
    cast,
    team,
    dates: [
      { at: '2026-11-28T18:00:00', venue: VENUE },
      { at: '2026-12-12T18:00:00', venue: VENUE },
    ],
    ticketInfo: TICKETS,
    poster: '/images/covers/hero-2.webp',
    photos: ['/images/scenes/scene-03.webp', '/images/scenes/scene-07.webp', '/images/scenes/scene-08.webp'],
    video: {
      title: { ka: 'სპექტაკლის ფრაგმენტი', en: 'Excerpt' },
      youtubeId: 'aqz-KE-bpKQ',
      poster: '/images/scenes/scene-03.webp',
    },
  },
  {
    slug: 'helados',
    title: { ka: 'ჰელადოსი', en: 'Hellados' },
    author: { ka: 'ნოდარ დუმბაძე', en: 'Nodar Dumbadze' },
    director: NAME,
    genre: { ka: 'დრამა', en: 'Drama' },
    durationMin: 55,
    age: '10+',
    summary: {
      ka: 'ნოდარ დუმბაძის მოთხრობის მიხედვით. სპექტაკლის მოკლე აღწერა აქ დაემატება.',
      en: 'After the story by Nodar Dumbadze. A short description of the performance will appear here.',
    },
    cast,
    team,
    dates: [{ at: '2026-12-19T19:00:00', venue: VENUE }],
    ticketInfo: TICKETS,
    poster: '/images/covers/katsia-adamiani.webp',
    photos: ['/images/scenes/scene-08.webp', '/images/scenes/scene-10.webp', '/images/scenes/scene-04.webp'],
  },
  {
    slug: 'sherekilebi',
    title: { ka: 'შერეკილები', en: 'The Madcaps' },
    author: TBA,
    director: NAME,
    genre: { ka: 'კომედია', en: 'Comedy' },
    durationMin: 60,
    age: '12+',
    summary: {
      ka: 'სპექტაკლის მოკლე აღწერა აქ დაემატება. ეს ტექსტი დროებითია.',
      en: 'A short description of the performance will appear here. This is temporary text.',
    },
    cast,
    team,
    dates: [],
    ticketInfo: TICKETS,
    poster: '/images/posters/sherekilebi.webp',
    photos: ['/images/scenes/scene-06.webp', '/images/scenes/scene-09.webp'],
  },
  {
    slug: 'katsia-adamiani',
    title: { ka: 'კაცია-ადამიანი?!', en: 'Is He a Man?!' },
    author: { ka: 'ილია ჭავჭავაძე', en: 'Ilia Chavchavadze' },
    director: NAME,
    genre: { ka: 'სატირა', en: 'Satire' },
    durationMin: 70,
    age: '12+',
    summary: {
      ka: 'ილია ჭავჭავაძის მოთხრობის მიხედვით: ლუარსაბ თათქარიძისა და დარეჯანის უქმი ცხოვრების მწარე და მხიარული სატირა.',
      en: 'After the story by Ilia Chavchavadze: a sharp, funny satire of the idle lives of Luarsab Tatkaridze and his wife Darejan.',
    },
    cast,
    team,
    dates: [],
    ticketInfo: TICKETS,
    poster: '/images/covers/katsia-adamiani.webp',
    cover: {
      src: '/images/covers/hero-2.webp',
      alt: {
        ka: 'მსახიობი და თოჯინა ერთმანეთს უყურებენ კვამლში, ფერადი რგოლის შიგნით',
        en: 'An actor and a puppet face each other through stage smoke, inside a coloured hoop',
      },
    },
    photos: ['/images/covers/katsia-adamiani.webp', '/images/scenes/scene-02.webp', '/images/scenes/scene-06.webp'],
  },
];
