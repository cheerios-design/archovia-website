// Generates the favicon / app-icon set in public/ from the brand-kit mark.
// Run with `npm run icons` after changing the mark or the brand colours.
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const INK = "#0e0d0c";
const PAPER = "#efebe4";

// Mark geometry from brand-kit/logo/svg/archovia-mark-*.svg (viewBox 196.23 × 442.67).
const MARK_W = 196.23;
const MARK_H = 442.67;
const MARK = `
  <polygon points="196.22 55.34 196.22 166 147.17 138.34 147.17 83 98.12 55.34 98.11 55.34 49.06 83 49.06 138.34 0 166 0 55.34 49.06 27.67 98.11 0 98.12 0 147.17 27.67"/>
  <polygon points="98.12 276.68 49.06 304.34 49.06 359.68 98.11 387.34 98.12 387.35 147.17 359.68 147.18 359.68 196.22 387.34 147.17 415.01 98.12 442.67 98.11 442.67 49.06 415.01 0 387.34 0 276.67 49.05 249.01 49.06 249.01 64.54 240.28 98.11 221.35 98.11 276.67 98.12 276.67"/>
  <polygon points="196.22 276.68 196.22 332.01 147.18 304.35 147.17 304.35 147.17 304.34 98.12 276.68 98.11 276.68 98.11 221.35 98.12 221.35 147.17 249.02 147.18 249.02"/>
  <polygon points="196.23 193.63 196.23 248.96 147.17 221.3 98.12 193.63 98.1 193.63 49.06 221.3 0 248.96 0 193.64 49.06 165.97 98.1 138.31 98.1 138.3 98.11 138.3 147.17 165.97"/>`;

/**
 * Square tile with the mark centred.
 * `fill` is the mark's height as a fraction of the tile: the brand kit's app icon uses 0.62;
 * tab-size favicons go larger so the mark stays legible at 16 px.
 */
function tile(fill) {
  const S = 1024;
  const scale = (S * fill) / MARK_H;
  const x = (S - MARK_W * scale) / 2;
  const y = (S - MARK_H * scale) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}"><title>Archovia</title><rect width="${S}" height="${S}" fill="${INK}"/><g fill="${PAPER}" transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${scale.toFixed(5)})">${MARK}</g></svg>`;
}

const png = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();

/** ICO container holding PNG-encoded images (supported by every current browser). */
function ico(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, e);
    header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt16LE(1, e + 4); // colour planes
    header.writeUInt16LE(32, e + 6); // bits per pixel
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((i) => i.data)]);
}

const favicon = tile(0.84); // tab sizes
const appIcon = tile(0.62); // brand-kit app-icon proportions; inside the PWA maskable safe zone

await mkdir("public/icons", { recursive: true });
await writeFile("public/favicon.svg", favicon);
await writeFile(
  "public/favicon.ico",
  ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(favicon, size) })))),
);
await writeFile("public/apple-touch-icon.png", await png(appIcon, 180));
await writeFile("public/icons/icon-192.png", await png(appIcon, 192));
await writeFile("public/icons/icon-512.png", await png(appIcon, 512));
console.log("Icons written to public/");
