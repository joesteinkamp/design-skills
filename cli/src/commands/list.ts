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

  console.table(
    skills.map((s) => ({
      name: s.frontmatter.name,
      category: s.frontmatter.category ?? "-",
      complexity: s.frontmatter.complexity ?? "-",
      source: s.source,
    })),
  );
  if (errors.length > 0) {
    console.error(`\n${errors.length} skill(s) failed to load:`);
    for (const e of errors) console.error(`  ${e.dir}: ${e.error}`);
  }
}
