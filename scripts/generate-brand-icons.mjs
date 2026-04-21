/**
 * Generates favicon, Apple touch icon, and Open Graph share image from
 * `scripts/brand-icon-source.jpg` into `public/brand/`.
 * Circular mask, gold ring, subtle radial highlight, boosted logo contrast.
 * Run: npm run generate-brand-icons
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const src = path.join(__dirname, 'brand-icon-source.jpg');
const outDir = path.join(root, 'public', 'brand');

const GOLD = '#B89B77';

/**
 * @param {number} size - square output dimension
 * @param {number} logoRatio - max logo width/height as fraction of size
 */
async function circularHighlightedIcon(size, logoRatio) {
  const cx = size / 2;
  const stroke = Math.max(1.5, Math.round(size / 28));
  const radius = cx - stroke / 2 - 0.5;

  const bgSvg = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hl" cx="42%" cy="38%" r="72%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="45%" stop-color="#FBFAF7"/>
          <stop offset="100%" stop-color="#EDE8DC"/>
        </radialGradient>
      </defs>
      <circle cx="${cx}" cy="${cx}" r="${radius}" fill="url(#hl)" stroke="${GOLD}" stroke-width="${stroke}"/>
    </svg>`,
  );

  const bg = await sharp(bgSvg).resize(size, size).ensureAlpha().png().toBuffer();

  const maxLogo = Math.floor(size * logoRatio);
  const sharpen =
    size <= 48
      ? { sigma: 0.35, m1: 0.85, m2: 1.4 }
      : { sigma: 0.65, m1: 1, m2: 2.2 };

  const logoBuf = await sharp(src)
    .rotate()
    .resize(maxLogo, maxLogo, { fit: 'inside' })
    .modulate({ brightness: 1.12, saturation: 1.18 })
    .sharpen(sharpen)
    .ensureAlpha()
    .png()
    .toBuffer();

  const { width: lw = 0, height: lh = 0 } = await sharp(logoBuf).metadata();
  const left = Math.round((size - lw) / 2);
  const top = Math.round((size - lh) / 2);

  return sharp(bg).composite([{ input: logoBuf, left, top }]).png().toBuffer();
}

async function main() {
  if (!fs.existsSync(src)) {
    console.error('Missing source image:', src);
    process.exit(1);
  }
  fs.mkdirSync(outDir, { recursive: true });

  const png32 = await circularHighlightedIcon(32, 0.56);
  await sharp(png32).png({ compressionLevel: 9 }).toFile(path.join(outDir, 'favicon-32x32.png'));
  await sharp(png32).webp({ quality: 92, effort: 6 }).toFile(path.join(outDir, 'favicon-32x32.webp'));

  const apple = await circularHighlightedIcon(180, 0.62);
  await sharp(apple).png({ compressionLevel: 9 }).toFile(path.join(outDir, 'apple-touch-icon.png'));

  const OG_W = 1200;
  const OG_H = 630;
  const badgeSize = 440;
  const badge = await circularHighlightedIcon(badgeSize, 0.62);
  const badgeBuf = await sharp(badge).webp({ quality: 92 }).toBuffer();
  const bw = badgeSize;
  const bh = badgeSize;
  const left = Math.round((OG_W - bw) / 2);
  const top = Math.round((OG_H - bh) / 2);

  await sharp({
    create: {
      width: OG_W,
      height: OG_H,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([{ input: badgeBuf, left, top }])
    .webp({ quality: 88, effort: 6 })
    .toFile(path.join(outDir, 'og-share.webp'));

  console.log('Brand assets written to', path.relative(root, outDir));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
