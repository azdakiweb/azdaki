import type { NewsItem } from './types';

/* SAMPLE DATA: illustrative items showing both news types from the brief. */
export const news: NewsItem[] = [
  {
    slug: 'madloba-noemberi',
    date: '2026-11-03',
    performanceSlug: 'madloba-miqvarkhar-mapatie',
    title: {
      ka: '21 ნოემბერს: „მადლობა, მიყვარხარ, მაპატიე“',
      en: '21 November: Thank You, I Love You, Forgive Me',
    },
    excerpt: {
      ka: 'ნიმუშის ანონსი: სპექტაკლის ჩანიშვნის შესახებ სიახლე ასე გამოჩნდება მთავარ გვერდზე.',
      en: 'Sample announcement: this is how a newly scheduled performance appears on the home page.',
    },
    body: [
      {
        ka: 'ეს ნიმუშის ტექსტია. აქ თეატრი გამოაქვეყნებს ინფორმაციას ჩვენების თარიღის, ადგილისა და ბილეთების შესახებ.',
        en: 'This is sample text. The theatre will publish the date, venue and ticket details of the performance here.',
      },
      {
        ka: 'სიახლეს შეიძლება დაერთოს ფოტოები და ბმული სპექტაკლის გვერდზე, სადაც მაყურებელი სრულ ინფორმაციას ნახავს.',
        en: 'A news item can carry photos and a link to the performance page, where visitors find the full details.',
      },
    ],
    image: '/images/covers/madloba.webp',
    imageAlt: { ka: 'მსახიობები ფერად კოსტიუმებში ცეკვავენ სცენაზე', en: 'Actors in colourful costumes dancing on stage' },
    photos: ['/images/scenes/scene-05.webp', '/images/scenes/scene-02.webp'],
  },
  {
    slug: 'me-vkhedav-mzes-chveneba',
    date: '2026-10-18',
    performanceSlug: 'me-vkhedav-mzes',
    title: { ka: '„მე ვხედავ მზეს“: როგორ ჩაიარა ჩვენებამ', en: 'I See the Sun: how the performance went' },
    excerpt: {
      ka: 'ნიმუშის ანგარიში: უკვე ჩატარებული სპექტაკლის სიახლე თავისი ფოტოებით.',
      en: 'Sample report: a news item about a past performance, with its photos.',
    },
    body: [
      {
        ka: 'ეს ნიმუშის ტექსტია. აქ თეატრი მოკლედ მოჰყვება ჩატარებულ ჩვენებაზე და დაურთავს ფოტოებს.',
        en: 'This is sample text. The theatre will write a short account of the performance here and attach photos.',
      },
    ],
    image: '/images/covers/hero-2.webp',
    imageAlt: { ka: 'მსახიობი და თოჯინა ერთმანეთს უყურებენ კვამლში', en: 'An actor and a puppet face each other through stage smoke' },
    photos: ['/images/scenes/scene-07.webp', '/images/scenes/scene-08.webp', '/images/scenes/scene-04.webp'],
  },
  {
    slug: 'helados-premiera',
    date: '2026-10-02',
    performanceSlug: 'helados',
    title: { ka: '„ჰელადოსი“ რეპერტუარში', en: 'Hellados joins the repertoire' },
    excerpt: {
      ka: 'ნიმუშის სიახლე: ახალი სპექტაკლის დამატება რეპერტუარში.',
      en: 'Sample item: a new performance added to the repertoire.',
    },
    body: [
      {
        ka: 'ეს ნიმუშის ტექსტია. აქ გამოქვეყნდება ინფორმაცია ახალი სპექტაკლისა და მასზე მომუშავე ჯგუფის შესახებ.',
        en: 'This is sample text. Details of the new performance and the team behind it will be published here.',
      },
    ],
    image: '/images/covers/katsia-adamiani.webp',
    imageAlt: { ka: 'მსახიობები ისტორიულ კოსტიუმებში გარე სცენაზე', en: 'Actors in historical costumes on an outdoor stage' },
    photos: [],
  },
  {
    slug: 'sezonis-gaxsna',
    date: '2026-09-14',
    title: { ka: 'ახალი სეზონი გაიხსნა', en: 'The new season has opened' },
    excerpt: {
      ka: 'ნიმუშის სიახლე თეატრის ცხოვრებიდან.',
      en: 'A sample item from the life of the theatre.',
    },
    body: [
      {
        ka: 'ეს ნიმუშის ტექსტია. აქ გამოქვეყნდება თეატრის სიახლეები.',
        en: 'This is sample text. News from the theatre will be published here.',
      },
    ],
    image: '/images/scenes/scene-06.webp',
    imageAlt: { ka: 'ორი მსახიობი რეპეტიციაზე, სცენაზე', en: 'Two actors rehearsing on stage' },
    photos: ['/images/scenes/scene-09.webp'],
  },
];
