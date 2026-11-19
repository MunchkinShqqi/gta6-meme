// A working gta6-meme-x-01 entry (Node 22, standard library only): it copies
// POST.json from the repository root to /output/POST.json, where the gate
// reads it, copies meme.png there too, and writes a dossier describing the
// meme. That is all the program has to do. The entry is the post itself:
// the meme is posted on X from a public account with make.fun (a link or
// written out) and/or a tag of @makefunai and the entrant's play code in its
// text, POST.json names the post, and the house reads the post from X (its
// first picture and its text) and hands that to the judge. Nothing this
// program writes about the post is judged.
//
// The POST.json this repository ships holds a placeholder address, so the
// gate refuses it as it stands (valid 0). Replace it with the post's address
// before submitting.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const DOSSIER = {
  title: '13 years of waiting for GTA 6 — the dogs couldn\'t wait any longer',
  top_text: '13 YEARS OF WAITING FOR GTA 6',
  bottom_text: "THE DOGS COULDN'T WAIT ANY LONGER",
  meme: 'meme.png',
  source: 'assets/source.jpg',
  ghost: 'assets/ghost.png',
  dimensions: { width: 1080, height: 1080 },
};

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
try {
  copyFileSync(join(BOT_DIR, 'meme.png'), join(OUTPUT_DIR, 'meme.png'));
} catch (err) {
  console.error(`meme.png could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
writeFileSync(join(OUTPUT_DIR, 'dossier.json'), JSON.stringify(DOSSIER, null, 2) + '\n');
