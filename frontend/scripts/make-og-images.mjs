// Generates the social-share images referenced by seo.config.js.
//
// These MUST live in public/ rather than src/assets: Vite content-hashes
// anything imported from src, so a hashed URL changes on every rebuild and
// breaks previews already cached by Facebook/WhatsApp. public/ URLs are stable.
//
// Run: npm run og

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srcAssets = path.join(root, "src", "assets");
const outDir = path.join(root, "public", "og");

// 1200x630 is the size Facebook, LinkedIn, WhatsApp and X all crop to.
const OG = { width: 1200, height: 630 };

const IMAGES = [
  { from: "hero.jpg", to: "og-home.jpg" },
  { from: "lc2.jpg", to: "og-about.jpg" },
  { from: "services.jpg", to: "og-services.jpg" },
  { from: "img35.jpg", to: "og-project.jpg" },
  { from: "architecture1.jpg", to: "og-portfolio.jpg" },
  { from: "contact.jpg", to: "og-contact.jpg" },
];

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  for (const { from, to } of IMAGES) {
    const input = path.join(srcAssets, from);
    try {
      await fs.access(input);
    } catch {
      console.warn(`  ! skipped ${to} — source ${from} not found`);
      continue;
    }

    const outPath = path.join(outDir, to);
    await sharp(input)
      .resize(OG.width, OG.height, { fit: "cover", position: "attention" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(outPath);

    const { size } = await fs.stat(outPath);
    console.log(`  ✓ ${to.padEnd(20)} ${(size / 1024).toFixed(0)} kB`);
  }

  // Square logo for schema.org and the apple-touch-icon.
  const logoIn = path.join(srcAssets, "logomm.png");
  const logoOut = path.join(outDir, "logo.png");
  await sharp(logoIn)
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(logoOut);
  console.log(`  ✓ logo.png`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
