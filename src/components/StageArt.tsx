/*
 * A small stage for the inner-page bands: curtains, two spotlights and the flat figures.
 * The floor runs past the drawing's left edge, so it spans the whole band.
 */
const FLOOR = 178;

const FIGURES = [
  { x: 178, h: 104, fill: 'var(--ink)' },
  { x: 252, h: 122, fill: 'var(--paper)' },
  { x: 322, h: 88, fill: 'var(--stone)' },
  { x: 408, h: 130, fill: 'var(--sand)' },
  { x: 482, h: 96, fill: 'var(--ink)' },
];

/* Curtain folds as alternating flat stripes. */
const FOLDS = [546, 570, 594, 618];

export function StageArt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 640 200" preserveAspectRatio="xMaxYMax meet" aria-hidden>
      <path d="M244 0H260L322 178H182Z" fill="var(--wine-deep)" />
      <path d="M400 0H416L478 178H338Z" fill="var(--wine-deep)" />

      {FOLDS.map((x) => (
        <rect key={x} x={x} width="12" height={FLOOR} fill="var(--wine-deep)" />
      ))}

      <rect x="-4000" y={FLOOR} width="4640" height="22" fill="var(--wine-deep)" />

      {FIGURES.map(({ x, h, fill }) => {
        const r = h * 0.13;
        const w = h * 0.17;
        const base = FLOOR + 2;
        return (
          <g key={x} fill={fill}>
            <circle cx={x} cy={base - h + r} r={r} />
            <path d={`M${x - w} ${base}V${base - h * 0.58}A${w} ${w} 0 0 1 ${x + w} ${base - h * 0.58}V${base}Z`} />
          </g>
        );
      })}
    </svg>
  );
}
