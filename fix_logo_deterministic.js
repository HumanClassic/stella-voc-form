const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, 'public', 'logo.png');
const outputPath = path.join(__dirname, 'public', 'logo_vibrant_amber.png');

async function fixLogo() {
  try {
    console.log('Starting deterministic logo processing...');
    
    // 1. Get metadata
    const image = sharp(inputPath);
    const { width, height } = await image.metadata();
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 2; // Slight inset for anti-aliasing safety

    // 2. Create the Cyber Yellow (#FFD300) base circle with transparent background
    const yellowCircle = Buffer.from(
      `<svg width="${width}" height="${height}">
        <circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="#FFD300" />
      </svg>`
    );

    // 3. Extract the white mask (text and dumbbell) from original logo
    // We threshold significantly to catch most white pixels
    const whiteMask = await sharp(inputPath)
      .ensureAlpha()
      .threshold(220) // Pixels brighter than 220 become white, others black
      .toBuffer();

    // 4. Composite: Yellow Circle Base + White Mask on top
    await sharp(yellowCircle)
      .composite([{
        input: whiteMask,
        blend: 'screen' // White pixels will remain white, black will show yellow below
      }])
      .png()
      .toFile(outputPath);

    console.log(`Success! Logo saved to: ${outputPath}`);
  } catch (err) {
    console.error('Error processing logo:', err);
    process.exit(1);
  }
}

fixLogo();
