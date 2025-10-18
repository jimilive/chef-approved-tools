const sharp = require('sharp');

async function fixPortraits() {
  console.log('🎯 Optimizing 2 portrait images...\n');

  // Headshot - resize to 500x750
  await sharp('public/images/team/head-shot-1.jpg')
    .resize(500, 750, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 88, progressive: true, mozjpeg: true })
    .toFile('public/images/team/head-shot-1-optimized.jpg');

  const stats1 = await require('fs').promises.stat('public/images/team/head-shot-1-optimized.jpg');
  console.log(`✅ Headshot: ${(stats1.size/1024).toFixed(0)} KB`);

  // Portrait - resize to 500x500 and convert to JPG
  await sharp('public/images/branding/scott-ai-portrait-circle.png')
    .resize(500, 500, { fit: 'cover' })
    .jpeg({ quality: 88, progressive: true })
    .toFile('public/images/branding/scott-ai-portrait-circle-optimized.jpg');

  const stats2 = await require('fs').promises.stat('public/images/branding/scott-ai-portrait-circle-optimized.jpg');
  console.log(`✅ Portrait: ${(stats2.size/1024).toFixed(0)} KB`);

  console.log('\n✅ Done! Check the -optimized versions, then replace originals if good.');
}

fixPortraits().catch(console.error);
