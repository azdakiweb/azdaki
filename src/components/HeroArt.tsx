import { EyeIris } from './EyeIris';
import styles from './Hero.module.css';

/*
 * The company as one chain: the flat stage figures, hand in hand, under the eye from the
 * logo, which opens inside a black half-disc that reads as both a rising sun and a stage.
 * Hand-placed coordinates, since each arm has to meet its neighbour's.
 */
const FLOOR = 300;

const FIGURES = [
  { x: 90, h: 230, fill: 'var(--paper)' },
  { x: 225, h: 180, fill: 'var(--sand)' },
  { x: 360, h: 150, fill: 'var(--stone)' },
  { x: 495, h: 210, fill: 'var(--wine)' },
  { x: 630, h: 170, fill: 'var(--paper)' },
];

const ARMS = [
  { d: 'M60 188Q30 160 24 112', stroke: 'var(--paper)' },
  { d: 'M122 188Q148 176 158 146', stroke: 'var(--paper)' },
  { d: 'M198 212Q170 190 158 146', stroke: 'var(--sand)' },
  { d: 'M252 212Q280 204 294 176', stroke: 'var(--sand)' },
  { d: 'M338 230Q306 216 294 176', stroke: 'var(--stone)' },
  { d: 'M382 230Q414 216 426 170', stroke: 'var(--stone)' },
  { d: 'M460 198Q438 190 426 170', stroke: 'var(--wine)' },
  { d: 'M530 198Q558 184 568 146', stroke: 'var(--wine)' },
  { d: 'M606 216Q578 194 568 146', stroke: 'var(--paper)' },
  { d: 'M654 216Q682 192 696 138', stroke: 'var(--paper)' },
];

export function Figures() {
  return (
    <svg className={styles.figures} viewBox={`0 0 720 ${FLOOR}`} preserveAspectRatio="xMidYMax meet" aria-hidden>
      <circle cx="360" cy={FLOOR} r="285" fill="var(--ink)" />

      {/* The eye from the logo: a band around the lids, and an iris that merges into the band. */}
      <clipPath id="hero-eye-lids">
        <path d="M272 96Q360 22 448 96Q360 168 272 96Z" />
      </clipPath>
      <path d="M244 96Q360 -10 476 96Q360 190 244 96Z" fill="var(--paper)" />
      <path d="M272 96Q360 22 448 96Q360 168 272 96Z" fill="var(--ink)" />
      <g clipPath="url(#hero-eye-lids)">
        <EyeIris />
        <rect className={styles.lidTop} x="260" y="-22" width="200" height="80" fill="var(--paper)" />
        <rect className={styles.lidBottom} x="260" y="133" width="200" height="80" fill="var(--paper)" />
      </g>

      <g fill="none" strokeWidth="15" strokeLinecap="round">
        {ARMS.map((a) => (
          <path key={a.d} d={a.d} stroke={a.stroke} />
        ))}
      </g>

      {FIGURES.map(({ x, h, fill }) => {
        const r = h * 0.13;
        const w = h * 0.17;
        return (
          <g key={x} fill={fill}>
            <circle cx={x} cy={FLOOR - h + r} r={r} />
            <path d={`M${x - w} ${FLOOR}V${FLOOR - h * 0.58}A${w} ${w} 0 0 1 ${x + w} ${FLOOR - h * 0.58}V${FLOOR}Z`} />
          </g>
        );
      })}
    </svg>
  );
}
