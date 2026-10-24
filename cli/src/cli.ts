#!/usr/bin/env node
import { Command, Option } from "commander";
import { initCommand } from "./commands/init.js";
import { listCommand } from "./commands/list.js";
import { describeCommand } from "./commands/describe.js";
import { runCommand } from "./commands/run.js";
import { evalCommand } from "./commands/eval.js";
import { mcpAddCommand } from "./commands/mcp/add.js";
import { mcpListCommand } from "./commands/mcp/list.js";
import { mcpDoctorCommand } from "./commands/mcp/doctor.js";
import { parsePassthroughFlags } from "./io/args.js";

const program = new Command();
program
  .name("design")
  .description("CLI for product designers — runs design-skills via the Claude CLI")
  .version("0.1.0")
  .enablePositionalOptions();

program
  .command("init")
  .description("Scaffold a design workspace in the current directory")
  .option("--gitignore", "Append `design/` to .gitignore", false)
  .action(initCommand);

program
  .command("list")
  .description("List discovered skills (bundled + user + project)")
  .option("--json", "Emit JSON instead of a table")
  .action(listCommand);

program
  .command("describe <skill>")
  .description("Show the input/output contract for a skill")
  .action(describeCommand);

program
  .command("run <skill> [skillArgs...]")
  .description(
    "Run a skill. Skill inputs follow as --<name> value pairs alongside any CLI options.",
  )
  .allowUnknownOption(true)
  .option("-y, --yes", "Non-interactive; all inputs must come from flags", false)
  .option("--dry-run", "Print the assembled prompt without invoking claude", false)
  .option("--out-dir <dir>", "Output directory root (default: ./design)")
  .option("--model <model>", "Override the skill's default model")
  .addOption(new Option("--max-budget-usd <amount>", "Cap claude spend").argParser(parseFloat))
  .action((skill: string, skillArgs: string[], opts) =>
    runCommand(skill, parsePassthroughFlags(skillArgs), opts),
  );

program
  .command("eval [skills...]")
  .description(
    "Run golden eval cases (evals/<skill>.yaml) and grade outputs against each skill's contract and quality bar",
  )
  .option("--no-judge", "Only run structural checks; skip the LLM quality-bar judge")
  .option("--case <id>", "Run a single case id")
  .option("--model <model>", "Override the model under test")
  .option("--judge-model <model>", "Model for the quality-bar judge (default: claude's default)")
  .option("--out-dir <dir>", "Where to write the JSON report (default: ./design/evals)")
  .addOption(new Option("--max-budget-usd <amount>", "Cap spend per skill run").argParser(parseFloat))
  .action(evalCommand);

const mcp = program.command("mcp").description("Manage MCP servers used by skills");
mcp
  .command("add <name>")
  .description("Add an MCP server (uses built-in registry for known names)")
  .option("--url <url>", "Override the server URL")
  .option("--transport <transport>", "http | sse | stdio")
  .option("--scope <scope>", "user | project | local")
  .action(mcpAddCommand);
mcp.command("list").description("List configured MCP servers").action(mcpListCommand);
mcp.command("doctor").description("Health-check configured MCP servers").action(mcpDoctorCommand);

try {
  await program.parseAsync(process.argv);
} catch (err) {
  console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}
