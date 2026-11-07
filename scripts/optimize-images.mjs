// Compresses real photos. Put originals in assets-src/photos (any sub-folders)
// and run `npm run images`: output goes to public/images with the same structure
// as WebP, max 2000px on the long edge, metadata stripped. next/image then serves
// responsive AVIF/WebP from these and lazy-loads them.
import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join, relative, parse } from 'node:path';

const SRC = 'assets-src/photos';
const OUT = 'public/images';
const MAX_EDGE = 2000;
const QUALITY = 90; // These are masters: next/image compresses again for delivery.

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );

if (!existsSync(SRC)) {
  console.log(`Nothing to do: ${SRC} does not exist.`);
  process.exit(0);
}

let before = 0;
let after = 0;
for (const file of walk(SRC).filter((f) => /\.(jpe?g|png|webp|tiff?|heic)$/i.test(f))) {
  const { dir, name } = parse(relative(SRC, file));
  const target = join(OUT, dir, `${name}.webp`);
  mkdirSync(dirname(target), { recursive: true });
  await sharp(file)
    .rotate()
    .resize(MAX_EDGE, MAX_EDGE, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(target);
  before += statSync(file).size;
  after += statSync(target).size;
  console.log(target);
}
console.log(`${(before / 1e6).toFixed(1)} MB -> ${(after / 1e6).toFixed(1)} MB`);
