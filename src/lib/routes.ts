import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionary';

export type NavEntry = { href: string; label: string; children?: { href: string; label: string }[] };

export const aboutLinks = (l: Locale, t: Dictionary) => [
  { href: `/${l}/about`, label: t.about.history },
  { href: `/${l}/about/artistic-director`, label: t.about.artisticDirector },
  { href: `/${l}/about/director`, label: t.about.director },
  { href: `/${l}/about/actors`, label: t.about.actors },
  { href: `/${l}/about/creative-team`, label: t.about.creativeTeam },
  { href: `/${l}/about/administration`, label: t.about.administration },
];

export const performanceLinks = (l: Locale, t: Dictionary) => [
  { href: `/${l}/performances`, label: t.perf.allShort },
  { href: `/${l}/performances/current`, label: t.perf.current },
];

export const mainNav = (l: Locale, t: Dictionary): NavEntry[] => [
  { href: `/${l}`, label: t.nav.home },
  { href: `/${l}/about`, label: t.nav.about, children: aboutLinks(l, t) },
  { href: `/${l}/performances`, label: t.nav.performances, children: performanceLinks(l, t) },
  { href: `/${l}/news`, label: t.nav.news },
  { href: `/${l}/gallery`, label: t.nav.gallery },
  { href: `/${l}/contact`, label: t.nav.contact },
];

export const CREDIT = { name: 'Gargari', url: 'https://www.gargari.ge/' };
