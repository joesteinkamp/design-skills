#!/usr/bin/env node
import { Command, Option } from "commander";
import { initCommand } from "./commands/init.js";
import { listCommand } from "./commands/list.js";
import { describeCommand } from "./commands/describe.js";
import { runCommand } from "./commands/run.js";
import { mcpAddCommand } from "./commands/mcp/add.js";
import { mcpListCommand } from "./commands/mcp/list.js";
import { mcpDoctorCommand } from "./commands/mcp/doctor.js";
import { pipelineListCommand } from "./commands/pipeline/list.js";
import { pipelineDescribeCommand } from "./commands/pipeline/describe.js";
import { pipelineRunCommand } from "./commands/pipeline/run.js";
import { parsePassthroughFlags } from "./io/args.js";
import { CLI_VERSION } from "./version.js";

const program = new Command();
program
  .name("design")
  .description("CLI for product designers — runs design-skills via the Claude CLI")
  .version(CLI_VERSION)
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
  .option("--no-next", "Suppress the post-run Next: nudges")
  .addOption(new Option("--max-budget-usd <amount>", "Cap claude spend").argParser(parseFloat))
  .action(async (skill: string, skillArgs: string[], opts) => {
    await runCommand(skill, parsePassthroughFlags(skillArgs), opts);
  });

const pipeline = program.command("pipeline").description("Run multi-skill pipelines");
pipeline
  .command("list")
  .description("List discovered pipelines")
  .option("--json", "Emit JSON instead of a table")
  .action(pipelineListCommand);
pipeline
  .command("describe <name>")
  .description("Show steps and graph for a pipeline")
  .action(pipelineDescribeCommand);
pipeline
  .command("run <name>")
  .description("Run a pipeline end to end")
  .option("-y, --yes", "Non-interactive; required inputs come from flags / context", false)
  .option("--dry-run", "Print the resolved execution plan without running", false)
  .option("--from <step>", "Start at the named step instead of the entry point")
  .option("--out-dir <dir>", "Output directory root (default: ./design)")
  .option("--model <model>", "Override every skill's default model")
  .action(pipelineRunCommand);

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
