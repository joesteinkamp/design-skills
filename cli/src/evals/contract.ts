export interface ContractSection {
  name: string;
  required: boolean;
}

export interface QualityRule {
  id: string;
  section: string;
  rule: string;
  severity: "blocker" | "warning";
}

/** Rows of the first markdown table after `heading` (cells trimmed, header and divider dropped). */
function tableRows(body: string, heading: string): string[][] {
  const start = body.indexOf(heading);
  if (start === -1) return [];
  const rows: string[][] = [];
  let inTable = false;
  for (const line of body.slice(start + heading.length).split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("|")) {
      inTable = true;
      rows.push(trimmed.replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
    } else if (inTable) {
      break;
    } else if (trimmed.startsWith("## ")) {
      break;
    }
  }
  return rows.slice(2);
}

export function parseOutputContract(body: string): ContractSection[] {
  return tableRows(body, "## Output Contract").map(([name = "", required = ""]) => ({
    name,
    required: required.toLowerCase().startsWith("yes"),
  }));
}

export function parseQualityBar(body: string): QualityRule[] {
  return tableRows(body, "## Quality Bar")
    .filter((r) => /^QB-\d+$/.test(r[0] ?? ""))
    .map(([id = "", section = "", rule = "", severity = ""]) => ({
      id,
      section,
      rule,
      severity: severity.toLowerCase() === "blocker" ? "blocker" : "warning",
    }));
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Required Output Contract sections with no matching markdown heading in `output`. */
export function missingSections(output: string, sections: ContractSection[]): string[] {
  const headings = [...output.matchAll(/^#{1,4}\s+(.+?)\s*#*$/gm)].map((m) => normalize(m[1] ?? ""));
  return sections
    .filter((s) => s.required)
    .map((s) => s.name)
    .filter((name) => {
      const want = normalize(name);
      return !headings.some((h) => h === want || h.startsWith(want) || h.endsWith(want));
    });
}
