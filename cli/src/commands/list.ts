import { discoverSkills } from "../skills/discover.js";

interface ListOptions {
  json?: boolean;
}

export async function listCommand(opts: ListOptions): Promise<void> {
  const { skills, errors } = await discoverSkills();

  if (opts.json) {
    process.stdout.write(
      JSON.stringify(
        {
          skills: skills.map((s) => ({
            name: s.frontmatter.name,
            category: s.frontmatter.category,
            complexity: s.frontmatter.complexity,
            source: s.source,
            description: s.frontmatter.description,
          })),
          errors,
        },
        null,
        2,
      ) + "\n",
    );
    return;
  }

  if (skills.length === 0) {
    console.log("No skills found.");
    return;
  }

  const rows = skills.map((s) => ({
    name: s.frontmatter.name,
    category: s.frontmatter.category ?? "-",
    complexity: s.frontmatter.complexity ?? "-",
    source: s.source,
  }));
  const w = {
    name: Math.max(4, ...rows.map((r) => r.name.length)),
    category: Math.max(8, ...rows.map((r) => r.category.length)),
    complexity: Math.max(10, ...rows.map((r) => r.complexity.length)),
    source: Math.max(6, ...rows.map((r) => r.source.length)),
  };
  const header = `${"NAME".padEnd(w.name)}  ${"CATEGORY".padEnd(w.category)}  ${"COMPLEXITY".padEnd(w.complexity)}  ${"SOURCE".padEnd(w.source)}`;
  console.log(header);
  console.log("-".repeat(header.length));
  for (const r of rows) {
    console.log(
      `${r.name.padEnd(w.name)}  ${r.category.padEnd(w.category)}  ${r.complexity.padEnd(w.complexity)}  ${r.source.padEnd(w.source)}`,
    );
  }
  if (errors.length > 0) {
    console.error(`\n${errors.length} skill(s) failed to load:`);
    for (const e of errors) console.error(`  ${e.dir}: ${e.error}`);
  }
}
