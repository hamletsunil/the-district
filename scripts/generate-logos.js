const sharp = require('sharp');
const path = require('path');

const DOWNLOADS = '/Users/sunilrajaraman/the-district/public/brand';

// Full logo with "The District" text - for Beehiiv profile
const fullLogoSvg = `
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#0a0f1a"/>

  <!-- Hamlet H Mark -->
  <g transform="translate(140, 100) scale(0.7)">
    <path d="M169.665 0H135.973V150H169.665V0Z" fill="#6366f1" />
    <path d="M57.6378 0H23.9453V150H57.6378V0Z" fill="#6366f1" />
    <path d="M0 96.7193L96.6264 52.3063L169.387 85.3426V118.889L96.6264 85.8526L0 130.266V96.7193Z" fill="#6366f1" />
  </g>

  <!-- The District text -->
  <text x="200" y="280" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="42" font-weight="700" fill="white">The District</text>
  <text x="200" y="320" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#6366f1" letter-spacing="2">A HAMLET PUBLICATION</text>
</svg>
`;

// Square logo for profile pics
const squareLogoSvg = `
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" rx="20" fill="#0a0f1a"/>

  <!-- Hamlet H Mark - centered -->
  <g transform="translate(30, 35) scale(0.82)">
    <path d="M169.665 0H135.973V150H169.665V0Z" fill="#6366f1" />
    <path d="M57.6378 0H23.9453V150H57.6378V0Z" fill="#6366f1" />
    <path d="M0 96.7193L96.6264 52.3063L169.387 85.3426V118.889L96.6264 85.8526L0 130.266V96.7193Z" fill="#6366f1" />
  </g>
</svg>
`;

// Wide banner/thumbnail for social sharing (OG image style)
const thumbnailSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0a0f1a"/>

  <!-- Subtle grid pattern -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(99, 102, 241, 0.1)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- Hamlet H Mark -->
  <g transform="translate(100, 190) scale(1.5)">
    <path d="M169.665 0H135.973V150H169.665V0Z" fill="#6366f1" />
    <path d="M57.6378 0H23.9453V150H57.6378V0Z" fill="#6366f1" />
    <path d="M0 96.7193L96.6264 52.3063L169.387 85.3426V118.889L96.6264 85.8526L0 130.266V96.7193Z" fill="#6366f1" />
  </g>

  <!-- Text content -->
  <text x="420" y="260" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="700" fill="white">The District</text>
  <text x="420" y="340" font-family="system-ui, -apple-system, sans-serif" font-size="28" fill="rgba(255,255,255,0.6)">Data-driven stories from</text>
  <text x="420" y="380" font-family="system-ui, -apple-system, sans-serif" font-size="28" fill="#6366f1">local government</text>
  <text x="420" y="450" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="rgba(255,255,255,0.4)" letter-spacing="3">A HAMLET PUBLICATION</text>
</svg>
`;

async function generateLogos() {
  try {
    // Full logo with text (400x400)
    await sharp(Buffer.from(fullLogoSvg))
      .png()
      .toFile(path.join(DOWNLOADS, 'district-logo-full.png'));
    console.log('✓ Created district-logo-full.png (400x400 with "The District" text)');

    // Square icon (200x200)
    await sharp(Buffer.from(squareLogoSvg))
      .png()
      .toFile(path.join(DOWNLOADS, 'district-logo-square.png'));
    console.log('✓ Created district-logo-square.png (200x200 H mark only)');

    // Thumbnail/OG image (1200x630)
    await sharp(Buffer.from(thumbnailSvg))
      .png()
      .toFile(path.join(DOWNLOADS, 'district-thumbnail.png'));
    console.log('✓ Created district-thumbnail.png (1200x630 social preview)');

    console.log('\n✅ All logos saved to Downloads folder!');
    console.log('\nUse these in Beehiiv:');
    console.log('  - Profile pic: district-logo-full.png or district-logo-square.png');
    console.log('  - Email header: district-logo-full.png');
    console.log('  - Social thumbnail: district-thumbnail.png');
  } catch (error) {
    console.error('Error generating logos:', error);
  }
}

generateLogos();
