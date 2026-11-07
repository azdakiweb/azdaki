// Flat, gradient-free placeholder art in the brand palette, so layouts can be
// judged before real photography exists. Delete public/images/{posters,scenes,people}
// once real material is in place.
import sharp from 'sharp';
import { mkdirSync, readFileSync } from 'node:fs';

const C = { ink: '#171414', wine: '#781F24', deep: '#4B1118', paper: '#F4EEE4', sand: '#E8DDCE', stone: '#B8AEA4' };
const OUT = 'public/images';
for (const d of ['posters', 'scenes', 'people']) mkdirSync(`${OUT}/${d}`, { recursive: true });

const save = (svg, file, q = 72) => sharp(Buffer.from(svg)).webp({ quality: q, effort: 6 }).toFile(`${OUT}/${file}.webp`);
const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;

const markSvg = readFileSync('public/brand/mark.svg', 'utf8');
const markPaths = markSvg.match(/<path[\s\S]*?\/>/g).join('');
const MARK_W = +markSvg.match(/viewBox="0 0 (\d+)/)[1];
const MARK_H = +markSvg.match(/viewBox="0 0 \d+ (\d+)/)[1];
const hand = (x, y, h, fill, rotate = 0) => {
  const s = h / MARK_H;
  return `<g transform="translate(${x} ${y}) rotate(${rotate}) scale(${s})" fill="${fill}" stroke="none">${markPaths.replace(/fill="[^"]*"/g, '').replace(/stroke="[^"]*"/g, '')}</g>`;
};
const rect = (x, y, w, h, f) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"/>`;
const circle = (x, y, r, f) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"/>`;

// --- Posters: 5 : 7 -----------------------------------------------------------
const P = [1000, 1400];
const posters = {
  madloba: rect(0, 0, ...P, C.wine) + circle(760, 1120, 430, C.deep) + hand(90, 150, 1150, C.paper, -9),
  'me-vkhedav-mzes':
    rect(0, 0, ...P, C.paper) + circle(500, 520, 400, C.wine) + rect(0, 920, 1000, 480, C.ink) +
    `<path d="M120 520 Q500 170 880 520 Q500 870 120 520Z" fill="${C.paper}"/>` + circle(500, 520, 165, C.ink),
  helados:
    rect(0, 0, ...P, C.deep) + Array.from({ length: 7 }, (_, i) => rect(0, 760 + i * 92, 1000, 46, C.paper)).join('') +
    `<path d="M170 700 A330 330 0 0 1 830 700Z" fill="${C.wine}"/>` + `<path d="M500 90 L500 700 L800 700Z" fill="${C.paper}"/>`,
  sherekilebi:
    rect(0, 0, ...P, C.sand) +
    `<g transform="rotate(-18 500 700)">${rect(120, 90, 250, 900, C.wine)}${rect(420, 330, 170, 1000, C.ink)}${rect(650, 40, 240, 720, C.deep)}</g>` +
    circle(760, 1060, 170, C.wine) + circle(270, 1180, 90, C.ink),
  'katsia-adamiani':
    rect(0, 0, ...P, C.ink) + circle(500, 370, 215, C.paper) +
    `<path d="M170 1400 V960 A330 330 0 0 1 830 960 V1400Z" fill="${C.wine}"/>` +
    rect(455, 720, 90, 410, C.paper) + circle(500, 1250, 58, C.paper),
};

// --- Stage scenes: 8 : 5 ------------------------------------------------------
const S = [1600, 1000];
const figure = (x, floor, h, f, lean = 0) => {
  const r = h * 0.13;
  return `<g transform="rotate(${lean} ${x} ${floor})">${circle(x, floor - h + r, r, f)}<path d="M${x - h * 0.17} ${floor} V${floor - h * 0.58} A${h * 0.17} ${h * 0.17} 0 0 1 ${x + h * 0.17} ${floor - h * 0.58} V${floor}Z" fill="${f}"/></g>`;
};
const curtain = (x, w, n, a, b) =>
  Array.from({ length: n }, (_, i) => rect(x + (i * w) / n, 0, w / n, 1000, i % 2 ? a : b)).join('');
const beam = (x, spread, floor, f) => `<path d="M${x - 16} 0 H${x + 16} L${x + spread} ${floor} H${x - spread}Z" fill="${f}"/>`;

const scenes = [
  rect(0, 0, ...S, C.ink) + beam(560, 300, 780, C.wine) + beam(1120, 240, 780, C.deep) + rect(0, 780, 1600, 220, C.deep) +
    figure(560, 800, 420, C.paper) + figure(1120, 800, 360, C.sand, 6),
  rect(0, 0, ...S, C.deep) + curtain(0, 420, 7, C.wine, C.deep) + curtain(1180, 420, 7, C.wine, C.deep) + rect(0, 830, 1600, 170, C.ink) +
    figure(700, 850, 400, C.paper, -4) + figure(860, 850, 460, C.stone, 3),
  rect(0, 0, ...S, C.sand) + circle(1180, 340, 240, C.wine) + rect(0, 720, 1600, 280, C.ink) +
    figure(360, 740, 470, C.ink) + figure(540, 740, 380, C.deep) + figure(700, 740, 430, C.ink, 4),
  rect(0, 0, ...S, C.wine) + hand(960, 60, 900, C.deep, 8) + rect(0, 860, 1600, 140, C.ink) + figure(460, 880, 460, C.paper),
  rect(0, 0, ...S, C.paper) + beam(800, 460, 800, C.sand) + rect(0, 800, 1600, 200, C.wine) +
    figure(650, 820, 400, C.ink, -5) + figure(800, 820, 470, C.deep) + figure(950, 820, 400, C.ink, 5),
  rect(0, 0, ...S, C.ink) + Array.from({ length: 6 }, (_, i) => figure(190 + i * 244, 900, 360 + ((i * 37) % 90), i % 2 ? C.wine : C.sand)).join('') + rect(0, 880, 1600, 120, C.deep),
  rect(0, 0, ...S, C.stone) + rect(0, 0, 640, 1000, C.deep) + circle(640, 480, 300, C.paper) + figure(1160, 880, 520, C.ink) + rect(0, 860, 1600, 140, C.ink),
  rect(0, 0, ...S, C.deep) + `<path d="M0 1000 L800 240 L1600 1000Z" fill="${C.wine}"/>` + figure(800, 860, 420, C.paper) + rect(0, 860, 1600, 140, C.ink),
  rect(0, 0, ...S, C.sand) + curtain(0, 1600, 16, C.sand, C.stone) + rect(0, 800, 1600, 200, C.deep) + figure(520, 820, 450, C.wine) + figure(1080, 820, 410, C.ink, 5),
  rect(0, 0, ...S, C.wine) + beam(400, 220, 820, C.paper) + beam(1200, 220, 820, C.ink) + rect(0, 820, 1600, 180, C.deep) + figure(400, 840, 400, C.ink) + figure(1200, 840, 400, C.paper),
];

// --- People: 4 : 5 ------------------------------------------------------------
const bgs = [C.sand, C.stone, C.wine, C.sand, C.deep, C.stone];
const fgs = [C.wine, C.ink, C.paper, C.ink, C.sand, C.deep];
const person = (i) =>
  rect(0, 0, 800, 1000, bgs[i]) + circle(400, 400, 165, fgs[i]) +
  `<path d="M110 1000 V860 A200 200 0 0 1 310 660 H490 A200 200 0 0 1 690 860 V1000Z" fill="${fgs[i]}"/>`;

await Promise.all([
  ...Object.entries(posters).map(([k, b]) => save(svg(...P, b), `posters/${k}`)),
  ...scenes.map((b, i) => save(svg(...S, b), `scenes/scene-${String(i + 1).padStart(2, '0')}`)),
  ...bgs.map((_, i) => save(svg(800, 1000, person(i)), `people/person-${i + 1}`)),
]);

// --- Icons and social card ----------------------------------------------------
const icon = (size, pad, bg, fg) => {
  const h = size - pad * 2;
  return svg(size, size, rect(0, 0, size, size, bg) + hand((size - h * (MARK_W / MARK_H)) / 2, pad, h, fg));
};
await sharp(Buffer.from(icon(512, 44, C.wine, C.paper))).resize(64).png({ compressionLevel: 9 }).toFile('src/app/icon.png');
await sharp(Buffer.from(icon(512, 60, C.wine, C.paper))).resize(180).png({ compressionLevel: 9 }).toFile('src/app/apple-icon.png');
await sharp(Buffer.from(svg(1200, 630, rect(0, 0, 1200, 630, C.wine) + hand(720, 40, 550, C.paper)))).jpeg({ quality: 82 }).toFile('public/og.jpg');
console.log('done');
