export function slugify(input: string, fallback = "untitled"): string {
  const s = input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return s || fallback;
}

export function flagKey(question: string): string {
  // Convert "Decision stage: proposal, refinement, or build-ready?" -> "decision-stage"
  const colonIdx = question.indexOf(":");
  const stem = colonIdx > 0 ? question.slice(0, colonIdx) : question;
  return slugify(stem, "input");
}
