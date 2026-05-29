import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imgDir = '/home/vino/dapur-amara/public/images';
const files = fs.readdirSync(imgDir);

for (const file of files) {
  if (file.endsWith('.png')) {
    const inputPath = path.join(imgDir, file);
    const baseName = path.basename(file, '.png');
    const outputPath = path.join(imgDir, `${baseName}.webp`);

    console.log(`Compressing ${file}...`);
    
    // Resize hero image slightly for LCP optimization, keep other aspect ratios
    let builder = sharp(inputPath);
    if (baseName === 'hero') {
      // Hero image is high resolution (1200px width is perfect for desktop, will load in ~30KB WebP)
      builder = builder.resize({ width: 1200, withoutEnlargement: true });
    } else {
      // Other menu cards/visuals are small cards, 600px width is more than enough
      builder = builder.resize({ width: 600, withoutEnlargement: true });
    }

    await builder
      .webp({ quality: 80, effort: 6 })
      .toFile(outputPath);

    console.log(`Saved ${baseName}.webp`);
  }
}
console.log('Image compression completed successfully!');
