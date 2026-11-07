/* Flat two-colour icons in the manner of the stage figures: solid shapes, no outlines. */
const base = { viewBox: '0 0 48 48', 'aria-hidden': true } as const;
const WINE = 'var(--wine)';
const INK = 'var(--ink)';

/* The company: three of the flat figures standing together. */
export const WhoIcon = () => (
  <svg {...base}>
    <g fill={INK}>
      <circle cx="9.5" cy="18" r="5" />
      <path d="M2 41V31a7.5 7.5 0 0 1 15 0v10z" />
      <circle cx="38.5" cy="18" r="5" />
      <path d="M31 41V31a7.5 7.5 0 0 1 15 0v10z" />
    </g>
    <g fill={WINE}>
      <circle cx="24" cy="12" r="6" />
      <path d="M15 41V28a9 9 0 0 1 18 0v13z" />
    </g>
  </svg>
);

/* The founding: a garden's first shoot. */
export const FoundedIcon = () => (
  <svg {...base}>
    <path fill={INK} d="M22.5 21h3v20h-3z" />
    <path fill={INK} d="M10 40h28v3H10z" />
    <path fill={WINE} d="M24 25C24 14 16 8 4 8c0 11 8 17 20 17z" />
    <path fill={WINE} d="M24 30c0-9 7-14 20-14 0 9-7 14-20 14z" />
  </svg>
);

/* The goals: the eye from the logo. */
export const GoalsIcon = () => (
  <svg {...base}>
    <path fill={WINE} d="M2 24C8 14 15.500 10 24 10s16 4 22 14c-6 10-13.500 14-22 14S8 34 2 24z" />
    <circle cx="24" cy="24" r="9" fill="var(--paper)" />
    <circle cx="24" cy="24" r="5" fill={INK} />
  </svg>
);

export const TasksIcon = () => (
  <svg {...base}>
    <path fill={INK} d="M9 4h3v40H9z" />
    <path fill={WINE} d="M12 6h29l-8 10 8 10H12z" />
  </svg>
);

export const AchievementsIcon = () => (
  <svg {...base}>
    <path fill={WINE} d="M24 3l6.300 13.600 14.700 1.800-10.900 10.100 2.900 14.700L24 35.900 11 43.200l2.900-14.700L3 18.400l14.700-1.800z" />
  </svg>
);
