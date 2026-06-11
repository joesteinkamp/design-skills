import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export async function writeOutput(
  outDir: string,
  filename: string,
  body: string,
): Promise<string> {
  await mkdir(outDir, { recursive: true });
  const safe = path.basename(filename);
  const dest = path.join(outDir, safe);
  await writeFile(dest, body, "utf8");
  return dest;
}
