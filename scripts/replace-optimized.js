const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

async function replaceWithOptimized() {
  console.log('🔄 Replacing original images with optimized versions...\n');

  const optFiles = glob.sync('public/images/**/*-opt.{jpg,jpeg,png,webp}');

  let replaced = 0;
  for (const optFile of optFiles) {
    const originalFile = optFile.replace('-opt', '');

    try {
      // Backup original
      await fs.rename(originalFile, `${originalFile}.backup`);

      // Replace with optimized
      await fs.rename(optFile, originalFile);

      console.log(`✅ Replaced: ${path.basename(originalFile)}`);
      replaced++;
    } catch (error) {
      console.error(`❌ Error replacing ${path.basename(originalFile)}: ${error.message}`);
    }
  }

  console.log(`\n✅ Replaced ${replaced} images!`);
  console.log('Backups saved as .backup (delete after verifying)');
}

replaceWithOptimized().catch(console.error);
