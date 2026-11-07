import type { ReactNode } from 'react';

/* Thin line icons drawn on a 24 grid to match the arrows on the brand board. */
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  'aria-hidden': true,
} as const;

export const ArrowRight = () => (
  <svg {...base}>
    <path d="M3 12h17M14 6l6 6-6 6" />
  </svg>
);
export const ArrowLeft = () => (
  <svg {...base}>
    <path d="M21 12H4M10 6l-6 6 6 6" />
  </svg>
);
export const ChevronDown = () => (
  <svg {...base}>
    <path d="M5 9l7 7 7-7" />
  </svg>
);
export const GlobeIcon = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.500 2.500 3.800 5.500 3.800 9s-1.300 6.500-3.800 9c-2.500-2.500-3.800-5.500-3.800-9S9.500 5.500 12 3z" />
  </svg>
);
export const CalendarIcon = () => (
  <svg {...base}>
    <path d="M4 6h16v14H4zM4 10.500h16M8.500 3.500V8M15.500 3.500V8" />
  </svg>
);
export const PhoneIcon = () => (
  <svg {...base}>
    <path d="M6 3h3.500l1.500 5-2.200 1.700a13 13 0 0 0 5.500 5.500L16 13l5 1.500V18a3 3 0 0 1-3 3A15 15 0 0 1 3 6a3 3 0 0 1 3-3z" />
  </svg>
);
export const MailIcon = () => (
  <svg {...base}>
    <path d="M3 5.500h18v13H3zM3.500 6l8.500 7 8.500-7" />
  </svg>
);
export const PinIcon = () => (
  <svg {...base}>
    <path d="M12 21.500S5 14.800 5 9.500a7 7 0 0 1 14 0c0 5.300-7 12-7 12z" />
    <circle cx="12" cy="9.500" r="2.500" />
  </svg>
);
const SOCIAL_GLYPHS: Record<string, ReactNode> = {
  facebook: <path fill="currentColor" stroke="none" d="M13.500 22v-8.500h2.900l.5-3.500h-3.400V7.900c0-1 .3-1.700 1.700-1.700H17V3.100c-.3 0-1.400-.1-2.600-.1-2.600 0-4.400 1.600-4.400 4.500V10H7v3.500h3V22z" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.200" cy="6.800" r="1.100" fill="currentColor" stroke="none" />
    </>
  ),
  tiktok: <path fill="currentColor" stroke="none" d="M16 2.500c.3 2.400 1.700 4 4.200 4.300v3.300c-1.600 0-3-.5-4.200-1.300v6.700a6.500 6.500 0 1 1-6.500-6.500c.4 0 .7 0 1 .1v3.400a3.200 3.200 0 1 0 2.100 3V2.500z" />,
};

/** A social network's mark, looked up by its name; nothing for a network without one. */
export const SocialIcon = ({ name }: { name: string }) => {
  const glyph = SOCIAL_GLYPHS[name.toLowerCase()];
  return glyph ? <svg {...base}>{glyph}</svg> : null;
};
export const Close = () => (
  <svg {...base}>
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);
export const Play = () => (
  <svg {...base}>
    <path d="M7 4.5v15L19.5 12z" />
  </svg>
);
/* The last line is shorter: lighter than three equal bars. */
export const Burger = () => (
  <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M3 8h22M3 14h22M3 20h13" />
  </svg>
);
