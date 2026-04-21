import { readdir, stat, unlink } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = fileURLToPath(new URL("../public/images/", import.meta.url));
const MAX_WIDTH = 2000;
const QUALITY = 85;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

const files = await walk(ROOT);
const targets = files.filter((f) => /\.(png|jpe?g)$/i.test(f));

let totalIn = 0;
let totalOut = 0;

for (const file of targets) {
  const { size: inSize } = await stat(file);
  totalIn += inSize;

  const outPath = file.replace(/\.(png|jpe?g)$/i, ".webp");
  const img = sharp(file);
  const meta = await img.metadata();
  const pipe = meta.width && meta.width > MAX_WIDTH
    ? img.resize({ width: MAX_WIDTH })
    : img;
  await pipe.webp({ quality: QUALITY }).toFile(outPath);

  const { size: outSize } = await stat(outPath);
  totalOut += outSize;

  if (outPath !== file) await unlink(file);

  const rel = file.replace(ROOT, "");
  const pct = Math.round((1 - outSize / inSize) * 100);
  console.log(`  ${rel}  ${kb(inSize)} → ${kb(outSize)}  (-${pct}%)`);
}

console.log("");
console.log(`Total: ${mb(totalIn)} → ${mb(totalOut)}  (-${Math.round((1 - totalOut / totalIn) * 100)}%)`);
console.log(`Converted ${targets.length} files.`);

function kb(n) {
  return `${(n / 1024).toFixed(0)}KB`;
}
function mb(n) {
  return `${(n / 1024 / 1024).toFixed(1)}MB`;
}
