/*
 * The gallery band: two figures, each caught in a beam, in opposite colours.
 * The floor runs past the left edge of the drawing.
 */
const BEAMS = [
  { x: 115, beam: 'var(--paper)', figure: 'var(--ink)' },
  { x: 370, beam: 'var(--ink)', figure: 'var(--paper)' },
];

export function GalleryArt() {
  return (
    <svg viewBox="0 0 490 200" preserveAspectRatio="xMaxYMax slice" style={{ overflow: 'visible' }} aria-hidden>
      <rect x="-4000" y="178" width="4490" height="22" fill="var(--wine-deep)" />
      {BEAMS.map(({ x, beam, figure }) => (
        <g key={x}>
          <path d={`M${x - 11} 0H${x + 11}L${x + 56} 178H${x - 56}Z`} fill={beam} />
          <g fill={figure}>
            <circle cx={x} cy="97" r="13" />
            <path d={`M${x - 17} 183V126A17 17 0 0 1 ${x + 17} 126V183Z`} />
          </g>
        </g>
      ))}
    </svg>
  );
}
