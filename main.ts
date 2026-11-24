// One-line vending machine pickup line.
// Writes the exact entry line to entry.txt inside the output
// directory given by the harness, and nothing else anywhere.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "Are you a snack? Because I have been waiting all day just to drop everything for you, and I only take exact change.";

// The bounty caps the line at 200 characters, and the file must hold
// exactly the line itself — no trailing newline, no extra whitespace.
if (line.length > 200) {
  throw new Error(`Line is ${line.length} characters, over the 200 limit`);
}
if (line.endsWith("\n")) {
  throw new Error("Line must not end with a newline");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
writeFileSync(target, line, "utf8");

// Read it back and check both the text and the byte count, so a
// stray newline or encoding change fails loudly instead of silently.
const back = readFileSync(target, "utf8");
if (back !== line) {
  throw new Error("entry.txt does not match the intended line");
}
if (Buffer.byteLength(back, "utf8") !== Buffer.byteLength(line, "utf8")) {
  throw new Error("entry.txt byte length does not match the line");
}
console.log(`Wrote ${line.length} characters to ${target}`);
