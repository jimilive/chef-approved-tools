const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImage(inputPath, outputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    const stats = await fs.stat(inputPath);
    const originalSize = stats.size;

    let operation = sharp(inputPath);

    // Resize if too large
    const metadata = await sharp(inputPath).metadata();
    if (metadata.width > 1200 || metadata.height > 1800) {
      operation = operation.resize(1200, 1800, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Optimize based on format
    if (ext === '.jpg' || ext === '.jpeg') {
      await operation
        .jpeg({ quality: 82, progressive: true, mozjpeg: true })
        .toFile(outputPath);
    } else if (ext === '.webp') {
      await operation
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);
    } else if (ext === '.png') {
      // Convert PNG photos to JPG (better compression)
      const newOutputPath = outputPath.replace('.png', '.jpg');
      await operation
        .jpeg({ quality: 85, progressive: true })
        .toFile(newOutputPath);
      outputPath = newOutputPath;
    }

    const newStats = await fs.stat(outputPath);
    const newSize = newStats.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    console.log(`✅ ${path.basename(inputPath)}: ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (${savings}% saved)`);

  } catch (error) {
    console.error(`❌ Error: ${path.basename(inputPath)} - ${error.message}`);
  }
}

async function optimizeCriticalImages() {
  console.log('🎯 Optimizing critical images...\n');

  // Headshot
  await optimizeImage(
    'public/images/team/head-shot-1.jpg',
    'public/images/team/head-shot-1-opt.jpg'
  );

  // Portrait circle PNG to JPG
  await optimizeImage(
    'public/images/branding/scott-ai-portrait-circle.png',
    'public/images/branding/scott-ai-portrait-circle-opt.jpg'
  );

  console.log('\n✅ Done! Check the -opt files, then replace originals if good.');
}

async function optimizeAllImages() {
  console.log('🎯 Optimizing ALL images over 100KB...\n');

  const glob = require('glob');
  const files = glob.sync('public/images/**/*.{jpg,jpeg,png,webp}');

  let count = 0;
  for (const file of files) {
    const stats = await fs.stat(file);
    if (stats.size > 100 * 1024) { // Only optimize files over 100KB
      const dir = path.dirname(file);
      const ext = path.extname(file);
      const name = path.basename(file, ext);
      const outputPath = path.join(dir, `${name}-opt${ext}`);

      await optimizeImage(file, outputPath);
      count++;
    }
  }

  console.log(`\n✅ Optimized ${count} images!`);
  console.log('Review the -opt files, then run replace script if satisfied.');
}

// Export for use
if (require.main === module) {
  const mode = process.argv[2] || 'critical';
  if (mode === 'all') {
    optimizeAllImages();
  } else {
    optimizeCriticalImages();
  }
}

module.exports = { optimizeImage, optimizeCriticalImages, optimizeAllImages };
