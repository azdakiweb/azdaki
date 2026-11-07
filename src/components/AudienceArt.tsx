/*
 * The performances band: seen from the seats. An open curtain, a performer on a raised
 * stage and a row of heads in front. The floor runs past the left edge of the drawing.
 */
const HEADS = [196, 266, 336, 406, 476, 546, 616];

export function AudienceArt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="150 0 490 200" preserveAspectRatio="xMaxYMax slice" aria-hidden>
      {/* Curtains and valance */}
      <path d="M150 0H300C286 58 240 92 186 104C170 118 164 134 164 150H150Z" fill="var(--wine-deep)" />
      <path d="M640 0H500C514 58 560 92 614 104C628 118 634 134 634 150H640Z" fill="var(--wine-deep)" />
      <rect x="150" width="490" height="12" fill="var(--wine-deep)" />

      {/* Stage and floor */}
      <rect x="150" y="150" width="490" height="28" fill="var(--wine-deep)" />
      <rect x="-4000" y="178" width="4640" height="22" fill="var(--wine-deep)" />

      {/* Performer */}
      <g fill="var(--paper)">
        <circle cx="400" cy="62" r="15" />
        <path d="M382 150V104A18 18 0 0 1 418 104V150Z" />
      </g>
      <path d="M384 100Q362 86 356 58M416 100Q438 86 444 58" fill="none" stroke="var(--paper)" strokeWidth="8" strokeLinecap="round" />

      {/* Audience */}
      <g fill="var(--ink)">
        {HEADS.map((x) => (
          <g key={x}>
            <circle cx={x} cy="162" r="17" />
            <path d={`M${x - 26} 200V192A26 20 0 0 1 ${x + 26} 192V200Z`} />
          </g>
        ))}
      </g>
    </svg>
  );
}
