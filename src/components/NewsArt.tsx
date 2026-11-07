/*
 * The news band: five flat figures under a large pale sun, directly on the band's wine.
 * The floor runs past the left edge of the drawing, as on the other pages.
 */
export function NewsArt() {
  return (
    <svg viewBox="0 0 490 200" preserveAspectRatio="xMaxYMax slice" style={{ overflow: 'visible' }} aria-hidden>
      <circle cx="362" cy="96" r="54" fill="var(--sand)" />
      <rect x="-4000" y="172" width="4490" height="28" fill="var(--wine-deep)" />

      <g transform="translate(0 22)">
        <g fill="var(--ink)">
          <circle cx="110" cy="58" r="15" />
          <path d="M91 150V88A19 19 0 0 1 129 88V150Z" />
          <circle cx="206" cy="72" r="14" />
          <path d="M188 150L190 104A17 17 0 0 1 224 106L220 150Z" />
        </g>
        <g fill="var(--paper)">
          <circle cx="158" cy="88" r="12" />
          <path d="M142 155V116A16 16 0 0 1 174 116V155Z" />
        </g>
        <g fill="var(--stone)">
          <circle cx="62" cy="80" r="12" />
          <path d="M47 150V108A15 15 0 0 1 77 108V150Z" />
        </g>
        <g fill="var(--sand)">
          <circle cx="256" cy="90" r="11" />
          <path d="M242 150V116A14 14 0 0 1 270 116V150Z" />
        </g>
      </g>
    </svg>
  );
}
