import sharp from "sharp";
import { existsSync, statSync } from "fs";

const images = [
  { src: "public/sky-tree.png", quality: 80 },
  { src: "public/photo.jpg",    quality: 82 },
  { src: "public/photo2.jpg",   quality: 82 },
];

for (const { src, quality } of images) {
  if (!existsSync(src)) continue;
  const out = src.replace(/\.(png|jpe?g)$/i, ".webp");
  await sharp(src).webp({ quality }).toFile(out);
  const before = statSync(src).size;
  const after  = statSync(out).size;
  const pct    = Math.round((1 - after / before) * 100);
  console.log(`✓ ${src} → ${out}  (${(before/1024).toFixed(0)} KB → ${(after/1024).toFixed(0)} KB, -${pct}%)`);
}
