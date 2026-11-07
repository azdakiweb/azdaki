import type { L } from '@/i18n/config';
import type { Partner, Person } from './types';

/*
 * The founding facts come from The Messenger (27 July 2016) and should be checked
 * by the theatre. Everything marked "name surname" is a stand-in.
 */
const NAME = { ka: 'სახელი გვარი', en: 'Name Surname' };
const p = (n: number) => `/images/people/person-${((n - 1) % 6) + 1}.webp`;
const BIO = {
  ka: 'მოკლე ბიოგრაფია აქ დაემატება.',
  en: 'A short biography will appear here.',
};

export const mission: L = {
  ka: 'ინტეგრირებული თეატრი „აზდაკის ბაღი“ არის ადგილი, სადაც ხელოვნება ადამიანებს აერთიანებს, განსხვავებულობა ხდება შესაძლებლობა და თითოეული ადამიანის უნარი იღებს სცენას.',
  en: "Azdak's Garden is an integrated theatre: a place where art brings people together, difference becomes possibility, and every person's ability takes the stage.",
};

export const history = {
  year: '2016',
  whoWeAre: {
    ka: '„აზდაკის ბაღი“ თბილისის ინკლუზიური თეატრია. ჩვენს დასში ერთად დგანან სცენაზე შეზღუდული შესაძლებლობის მქონე მსახიობები და მოხალისე მსახიობები.',
    en: "Azdak's Garden is an inclusive theatre in Tbilisi. In our company, actors with disabilities share the stage with volunteer actors.",
  },
  founded: {
    ka: 'თეატრი 2016 წლის მარტში დაარსდა. პირველი სპექტაკლი, ნოდარ დუმბაძის მოთხრობის მიხედვით დადგმული „ბოშები“, თბილისში, მზიურის პარკში ითამაშეს, შემდეგ კი ის ქუთაისის ლადო მესხიშვილის სახელობის თეატრმაც უმასპინძლა.',
    en: "The theatre was founded in March 2016. Its first production, Gypsies, after a story by Nodar Dumbadze, was staged in Tbilisi's Mziuri Park and later hosted by the Lado Meskhishvili State Theatre in Kutaisi.",
  },
  goals: {
    ka: 'შევქმნათ ახალი შესაძლებლობები შეზღუდული შესაძლებლობის მქონე ადამიანებისთვის და გავზარდოთ საზოგადოების ცნობიერება.',
    en: 'To create new opportunities for people with disabilities and to raise public awareness.',
  },
  tasks: [
    { ka: 'ამოცანების ჩამონათვალი აქ დაემატება.', en: 'The list of objectives will appear here.' },
  ] as L[],
  achievements: [
    { ka: 'მიღწევების ჩამონათვალი აქ დაემატება.', en: 'The list of achievements will appear here.' },
  ] as L[],
};

export const artisticDirector: Person = {
  name: { ka: 'ივანე (ბაჩო) გაბრუაშვილი', en: 'Ivane (Bacho) Gabruashvili' },
  role: { ka: 'რეჟისორი, სამხატვრო ხელმძღვანელი', en: 'Director, artistic director' },
  bio: {
    ka: 'თეატრის დაარსებამდე შვიდი წლის განმავლობაში მუშაობდა რეჟისორად შეზღუდული შესაძლებლობის მქონე ადამიანებთან სარეაბილიტაციო დაწესებულებებსა და დღის ცენტრებში. სრული ბიოგრაფია აქ დაემატება.',
    en: 'Seven years of directing work with people with disabilities in rehabilitation facilities and day centres preceded the founding of the theatre. A full biography will appear here.',
  },
  photo: p(5),
};

export const director: Person = {
  name: NAME,
  role: { ka: 'დირექტორი', en: 'Managing director' },
  bio: { ka: 'ბიოგრაფია აქ დაემატება.', en: 'A biography will appear here.' },
  photo: p(2),
};

const people = (count: number, role?: L, offset = 0): Person[] =>
  Array.from({ length: count }, (_, i) => ({ name: NAME, role, bio: BIO, photo: p(i + 1 + offset) }));

export const ownActors = people(8);
export const guestActors = people(4, undefined, 3);

export const creativeTeam: Person[] = [
  { name: NAME, role: { ka: 'რეჟისორი', en: 'Director' }, photo: p(3) },
  { name: NAME, role: { ka: 'მხატვარი', en: 'Set designer' }, photo: p(1) },
  { name: NAME, role: { ka: 'კომპოზიტორი', en: 'Composer' }, photo: p(6) },
  { name: NAME, role: { ka: 'ქორეოგრაფი', en: 'Choreographer' }, photo: p(4) },
];

export const administration: Person[] = [
  { name: NAME, role: { ka: 'პროექტების მენეჯერი', en: 'Project manager' }, photo: p(2) },
  { name: NAME, role: { ka: 'საზოგადოებასთან ურთიერთობა', en: 'Public relations' }, photo: p(4) },
  { name: NAME, role: { ka: 'ადმინისტრატორი', en: 'Administrator' }, photo: p(1) },
];

export const sponsors: Partner[] = Array.from({ length: 5 }, (_, i) => ({
  name: { ka: `სპონსორი ${i + 1}`, en: `Sponsor ${i + 1}` },
}));
