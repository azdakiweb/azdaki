// Vectorises the logo out of the brand board. Replace with the designer's
// original vector file when it is available.
import sharp from 'sharp';
import potrace from 'potrace';
import { writeFileSync } from 'node:fs';

const SRC = 'assets-src/brand-board.jpg';
const SCALE = 8;
const regions = {
  mark: { left: 40, top: 145, width: 255, height: 305 },
  wordmark: { left: 70, top: 455, width: 200, height: 95 },
  lockup: { left: 40, top: 145, width: 255, height: 405 },
};

const trace = (buf) =>
  new Promise((res, rej) =>
    potrace.trace(buf, { threshold: 128, turdSize: 60, optTolerance: 0.6, color: 'currentColor' }, (e, svg) =>
      e ? rej(e) : res(svg),
    ),
  );

for (const [name, region] of Object.entries(regions)) {
  const buf = await sharp(SRC)
    .extract(region)
    .extractChannel('green')
    .resize(region.width * SCALE, region.height * SCALE, { kernel: 'lanczos3' })
    .blur(SCALE * 0.45)
    .threshold(135)
    .png()
    .toBuffer();
  // Whole-unit coordinates on an 8x canvas are visually identical and half the bytes.
  const svg = (await trace(buf)).replace(/\d+\.\d+/g, (n) => String(Math.round(+n)));
  writeFileSync(`public/brand/${name}.svg`, svg);
  console.log(name, svg.length);
}
