// Parse leftover args from commander's `allowUnknownOption(true)` capture.
// Each `--key value` pair becomes inputs[key] = value; bare `--flag` becomes true.
export function parsePassthroughFlags(args: string[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (!a || !a.startsWith("--")) continue;
    const key = a.slice(2);
    const next = args[i + 1];
    if (next === undefined || next.startsWith("--")) {
      out[key] = true;
    } else {
      out[key] = next;
      i++;
    }
  }
  return out;
}
