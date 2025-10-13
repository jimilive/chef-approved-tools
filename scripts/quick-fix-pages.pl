#!/usr/bin/env perl
use strict;
use warnings;
use File::Slurp;

# List of pages to fix
my @pages = qw(
  norton-im200-tri-stone-sharpener
  black-decker-toaster-oven
  bodum-chambord-french-press
  method-all-purpose-cleaner
  zuperia-bar-mops
  victorinox-offset-bread-knife
  diamond-crystal-kosher-salt
  victorinox-fibrox-8-inch-chefs-knife
  victorinox-fibrox-10-inch-chefs-knife
  benriner-large-mandoline
  cuisinart-8-inch-nonstick-pan
);

foreach my $slug (@pages) {
    my $file = "app/reviews/$slug/page.tsx";

    unless (-f $file) {
        print "❌ File not found: $file\n";
        next;
    }

    print "\n🔧 Processing: $slug\n";

    # Read file
    my $content = read_file($file);

    # Backup
    my $backup = "$file.backup-" . `date +%Y%m%d`;
    chomp $backup;
    write_file($backup, $content);
    print "  💾 Backup created\n";

    # Check if already has tracker
    if ($content =~ /ProductViewTrackerWrapper/) {
        print "  ✅ Already has tracker\n";
        next;
    }

    # 1. Add imports after existing imports
    unless ($content =~ /import Image from/) {
        $content =~ s/(import.*?'next\/link';?\n)/$1import Image from 'next\/image';\n/;
        print "  ➕ Added Image import\n";
    }

    unless ($content =~ /import ProductViewTrackerWrapper/) {
        $content =~ s/(import.*?'next\/link';?\n.*?)(\n\nexport)/$1\nimport ProductViewTrackerWrapper from '\@\/components\/ProductViewTrackerWrapper';\n$2/s;
        print "  ➕ Added ProductViewTrackerWrapper import\n";
    }

    # 2. Add productData const before metadata export
    my $product_name = ucfirst($slug);
    $product_name =~ s/-/ /g;

    my $product_data = qq{
const productData = {
  name: "$product_name",
  slug: "$slug",
  brand: "Brand Name",
  category: "Kitchen Equipment",
  priceRange: {
    min: 20,
    max: 50,
    currency: "USD"
  },
  affiliateLinks: [],
  expertRating: 4.5,
  expertOpinion: "Professional-grade quality.",
  pros: [],
  cons: [],
  dateAdded: "2025-10-13",
  lastUpdated: "2025-10-13",
  images: {
    primary: "/logo.png"
  }
};

};

    $content =~ s/(import.*?\n\n)(export const metadata)/$1$product_data$2/s;
    print "  ➕ Added productData structure\n";

    # 3. Add tracker after first div/article in return statement
    $content =~ s/(return \(\s*<(?:div|article)[^>]*>\s*(?:\n\s*)?)([^<])/$1<ProductViewTrackerWrapper\n        slug={productData.slug}\n        name={productData.name}\n        image={productData.images.primary}\n        price={productData.priceRange.min}\n      \/>\n      $2/s;
    print "  ➕ Added ProductViewTrackerWrapper\n";

    # 4. Convert img to Image (simple case)
    my $img_count = 0;
    while ($content =~ /<img\s+src="([^"]+)"\s+alt="([^"]+)"/g) {
        $img_count++;
    }

    if ($img_count > 0) {
        $content =~ s/<img\s+src="([^"]+)"\s+alt="([^"]+)"[^>]*\/?>/
          <Image src="$1" alt="$2" width={100} height={100} \/>/g;
        print "  🖼️  Converted $img_count <img> tag(s) to <Image>\n";
    }

    # Write file
    write_file($file, $content);
    print "  ✅ Done!\n";
}

print "\n" . "=" x 60 . "\n";
print "✅ Batch processing complete!\n";
print "=" x 60 . "\n";
