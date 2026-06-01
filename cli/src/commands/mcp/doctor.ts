import { execa } from "execa";

// `claude mcp list` already health-checks servers and prints status.
// `doctor` adds a higher-signal summary by parsing exit codes / output.
export async function mcpDoctorCommand(): Promise<void> {
  const result = await execa("claude", ["mcp", "list"], {
    reject: false,
    stdout: "pipe",
    stderr: "pipe",
  });
  process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);

  const lines = result.stdout.split("\n");
  const failing = lines.filter((l) => /✗|fail|error|disconnect/i.test(l));
  if (failing.length > 0) {
    console.error(`\n${failing.length} server(s) appear unhealthy.`);
    process.exitCode = 1;
    return;
  }
  console.error("\nAll configured MCP servers are reachable.");
}
