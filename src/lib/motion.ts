/* False when the visitor asked their system to reduce motion. */
export const motionAllowed = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
