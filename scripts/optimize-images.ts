// scripts/generate-icons.js
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Icon size configurations for favicon
const iconSizes = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'favicon-48x48.png': 48,
  'apple-touch-icon.png': 180,
  'android-chrome-192x192.png': 192,
  'android-chrome-512x512.png': 512,
  'icon-192.png': 192,
  'icon-512.png': 512,
};

// Supported image extensions
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];

// Ensure directory exists
const ensureDir = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Recursively get all files in a directory
const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []) => {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
};

// Generate favicon icons from source
const generateFaviconIcons = async (sourcePath: string, outputDir: string) => {
  console.log(`\n🎨 Generating favicon icons...`);
  console.log(`   Source: ${sourcePath}`);
  console.log(`   Output: ${outputDir}`);

  try {
    ensureDir(outputDir);
    const generatedFiles = [];

    // Load the source image
    const sourceBuffer = await sharp(sourcePath).toBuffer();

    // Generate each icon size
    for (const [filename, size] of Object.entries(iconSizes)) {
      console.log(`   Creating ${filename} (${size}x${size})...`);
      try {
        await sharp(sourceBuffer)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 },
          })
          .png()
          .toFile(path.join(outputDir, filename));
        generatedFiles.push(filename);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(`   ⚠️  Failed to create ${filename}:`, err.message);
      }
    }

    // Special handling for favicon.ico (multi-size)
    console.log(`   Creating favicon.ico...`);
    try {
      const favicon32 = await sharp(sourceBuffer).resize(32, 32).png().toBuffer();
      fs.writeFileSync(path.join(outputDir, 'favicon.ico'), favicon32);
      generatedFiles.push('favicon.ico');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(`   ⚠️  Failed to create favicon.ico:`, err.message);
    }

    console.log(`✅ Generated ${generatedFiles.length} favicon icons`);
    return generatedFiles;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`❌ Error generating favicon icons:`, error.message);
    throw error;
  }
};

// Optimize regular images
const optimizeImage = async (sourcePath: string, outputPath: string) => {
  const ext = path.extname(sourcePath).toLowerCase();
  const filename = path.basename(sourcePath);

  console.log(`   Optimizing ${filename}...`);

  try {
    const image = sharp(sourcePath);
    const metadata = await image.metadata();

    // Skip SVGs - just copy them
    if (ext === '.svg') {
      fs.copyFileSync(sourcePath, outputPath);
      return;
    }

    // Configure optimization based on format
    let optimized = image;

    // Resize if image is too large (max 2000px on longest side)
    if (metadata.width > 2000 || metadata.height > 2000) {
      optimized = optimized.resize(2000, 2000, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Apply format-specific optimizations
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        await optimized.jpeg({ quality: 85, progressive: true }).toFile(outputPath);
        break;

      case '.png':
        await optimized.png({ quality: 90, compressionLevel: 9 }).toFile(outputPath);
        break;

      case '.webp':
        await optimized.webp({ quality: 85 }).toFile(outputPath);
        break;

      case '.gif':
        // For GIFs, just copy as Sharp doesn't handle animated GIFs well
        fs.copyFileSync(sourcePath, outputPath);
        break;

      default:
        // For unknown formats, try to convert to JPEG
        await optimized.jpeg({ quality: 85, progressive: true }).toFile(outputPath.replace(ext, '.jpg'));
    }

    console.log(`   ✅ Optimized ${filename}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`   ⚠️  Failed to optimize ${filename}:`, error.message);
  }
};

// Main function
const processImages = async () => {
  try {
    console.log('🚀 Starting image processing...\n');

    const assetsDir = './assets';
    const publicDir = './public';
    const iconsDir = './public/icons';

    // Check if assets directory exists
    if (!fs.existsSync(assetsDir)) {
      console.error(`❌ Assets directory not found: ${assetsDir}`);
      return;
    }

    // Ensure output directories exist
    ensureDir(publicDir);
    ensureDir(iconsDir);

    // Get all files recursively
    const allFiles = getAllFiles(assetsDir);

    // Filter for image files
    const imageFiles = allFiles.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });

    console.log(`Found ${imageFiles.length} images in ${assetsDir} (including subdirectories)\n`);

    // Process each image
    for (const filePath of imageFiles) {
      const relativePath = path.relative(assetsDir, filePath);
      const filename = path.basename(filePath);
      const relativeDir = path.dirname(relativePath);

      // Check if it's the favicon (at any level)
      if (filename === 'favicon.png') {
        await generateFaviconIcons(filePath, iconsDir);
      } else {
        // Regular image optimization - maintain directory structure
        const outputDir = path.join(publicDir, relativeDir);
        const outputPath = path.join(outputDir, filename);

        // Ensure the output directory exists
        ensureDir(outputDir);

        await optimizeImage(filePath, outputPath);
      }
    }

    console.log('\n🎉 All images processed successfully!');
    console.log('\n📝 Results:');
    console.log('   - Optimized images are in /public (maintaining directory structure)');
    console.log('   - Favicon icons are in /public/icons');
  } catch (error) {
    console.error('\n❌ Failed to process images:', error);
  }
};

// Run it
processImages();
