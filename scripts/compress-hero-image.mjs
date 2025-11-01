import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { statSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const inputPath = join(projectRoot, 'public/images/cast-iron-steak-sear.jpg');
const outputPath = join(projectRoot, 'public/images/cast-iron-steak-sear-compressed.jpg');

console.log('🖼️  Image Compression Starting...\n');

// Get original file size
const originalStats = statSync(inputPath);
const originalSize = (originalStats.size / 1024 / 1024).toFixed(2);
console.log(`Original size: ${originalSize}MB`);

try {
  // Compress the image
  await sharp(inputPath)
    .resize(1920, null, {
      // Resize to max width of 1920px, maintain aspect ratio
      withoutEnlargement: true,
      fit: 'inside'
    })
    .jpeg({
      quality: 85, // High quality but compressed
      progressive: true, // Progressive JPEG for better perceived performance
      mozjpeg: true // Use mozjpeg for better compression
    })
    .toFile(outputPath);

  // Get compressed file size
  const compressedStats = statSync(outputPath);
  const compressedSize = (compressedStats.size / 1024 / 1024).toFixed(2);
  const savings = ((1 - compressedStats.size / originalStats.size) * 100).toFixed(1);

  console.log(`Compressed size: ${compressedSize}MB`);
  console.log(`Savings: ${savings}%\n`);
  console.log(`✅ Compressed image saved to: ${outputPath}`);
  console.log(`\n📝 Next step: Replace the original file with the compressed version`);
  console.log(`   mv "${outputPath}" "${inputPath}"`);
} catch (error) {
  console.error('❌ Error compressing image:', error);
  process.exit(1);
}
