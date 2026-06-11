import { checkMcpHealth } from "../../mcp/health.js";

export async function mcpDoctorCommand(): Promise<void> {
  const report = await checkMcpHealth();
  process.stdout.write(report.stdout);
  if (report.stderr) process.stderr.write(report.stderr);

  if (report.unhealthy.length > 0) {
    console.error(`\n${report.unhealthy.length} server(s) appear unhealthy.`);
    process.exitCode = 1;
    return;
  }
  console.error("\nAll configured MCP servers are reachable.");
}
