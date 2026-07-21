import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imageDirectory = path.join(projectRoot, 'src/assets/images');

const imageSets = [
  {
    source:
      'miami-wedding-officiant-marriage-certificate-south-florida-best-venues-florida-luxury.jpg',
    outputPrefix: 'hero-wedding-officiant-miami',
    widths: [640, 960, 1280, 1920],
    quality: 78,
  },
  {
    source:
      'miami-officiant-marriage-south-florida-best-venues-florida-luxury-miami2.jpg',
    outputPrefix: 'contact-wedding-officiant-miami',
    widths: [480, 768, 1024],
    quality: 78,
  },
];

await mkdir(imageDirectory, { recursive: true });

for (const imageSet of imageSets) {
  const sourcePath = path.join(imageDirectory, imageSet.source);

  for (const width of imageSet.widths) {
    const outputPath = path.join(
      imageDirectory,
      `${imageSet.outputPrefix}-${width}.webp`,
    );

    await sharp(sourcePath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: imageSet.quality, effort: 6 })
      .toFile(outputPath);

    console.log(`Generated ${path.relative(projectRoot, outputPath)}`);
  }
}
