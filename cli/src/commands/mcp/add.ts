import { execa } from "execa";
import { findKnown, KNOWN_MCP_SERVERS } from "../../mcp/registry.js";

interface AddOptions {
  url?: string;
  transport?: "http" | "sse" | "stdio";
  scope?: "user" | "project" | "local";
}

export async function mcpAddCommand(name: string, opts: AddOptions): Promise<void> {
  const known = findKnown(name);
  const url = opts.url ?? known?.url;
  const transport = opts.transport ?? known?.transport ?? "http";

  if (!url && transport !== "stdio") {
    console.error(`Unknown MCP server "${name}" and no --url provided.`);
    console.error(`Known servers: ${KNOWN_MCP_SERVERS.map((s) => s.name).join(", ")}`);
    process.exitCode = 1;
    return;
  }

  const args = ["mcp", "add", "--transport", transport];
  if (opts.scope) args.push("--scope", opts.scope);
  args.push(name);
  if (url) args.push(url);
  else if (known?.command) {
    args.push(known.command, ...(known.args ?? []));
  }

  console.error(`Adding MCP server: claude ${args.join(" ")}`);
  await execa("claude", args, { stdio: "inherit" });
}
