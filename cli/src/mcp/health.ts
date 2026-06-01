import { execa } from "execa";

export interface HealthReport {
  stdout: string;
  stderr: string;
  unhealthy: string[];
}

const UNHEALTHY_RE = /✗|fail|error|disconnect/i;

// `claude mcp list` health-checks configured servers and prints a human-readable
// status table. We surface its output verbatim and flag any line that looks
// unhealthy by string match — the upstream format is the contract.
export async function checkMcpHealth(): Promise<HealthReport> {
  const result = await execa("claude", ["mcp", "list"], {
    reject: false,
    stdout: "pipe",
    stderr: "pipe",
  });
  const unhealthy = result.stdout.split("\n").filter((l) => UNHEALTHY_RE.test(l));
  return { stdout: result.stdout, stderr: result.stderr, unhealthy };
}
