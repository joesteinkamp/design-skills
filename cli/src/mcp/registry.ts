// Known MCP servers that designer skills reach for. URLs/commands are
// the canonical endpoints; users can override with --url.
export type McpTransport = "http" | "sse" | "stdio";

export interface KnownMcpServer {
  name: string;
  transport: McpTransport;
  url?: string;
  command?: string;
  args?: string[];
  description: string;
}

export const KNOWN_MCP_SERVERS: KnownMcpServer[] = [
  {
    name: "figma",
    transport: "http",
    url: "http://127.0.0.1:3845/mcp",
    description: "Figma Dev Mode MCP server (local Figma app, requires Dev Mode enabled)",
  },
  {
    name: "linear",
    transport: "sse",
    url: "https://mcp.linear.app/sse",
    description: "Linear MCP server (OAuth in browser on first use)",
  },
  {
    name: "notion",
    transport: "http",
    url: "https://mcp.notion.com/mcp",
    description: "Notion remote MCP server",
  },
  {
    name: "github",
    transport: "http",
    url: "https://api.githubcopilot.com/mcp/",
    description: "GitHub remote MCP server (requires OAuth/token)",
  },
];

export function findKnown(name: string): KnownMcpServer | undefined {
  return KNOWN_MCP_SERVERS.find((s) => s.name === name);
}

export interface AddOverrides {
  url?: string;
  transport?: McpTransport;
  scope?: "user" | "project" | "local";
}

// Returns argv for `claude mcp add ...` given a server name + optional overrides.
// Throws if the server isn't known and no URL/command is provided.
export function buildAddArgs(name: string, overrides: AddOverrides): string[] {
  const known = findKnown(name);
  const url = overrides.url ?? known?.url;
  const transport = overrides.transport ?? known?.transport ?? "http";

  if (!url && transport !== "stdio") {
    throw new Error(
      `Unknown MCP server "${name}" and no --url provided. ` +
        `Known servers: ${KNOWN_MCP_SERVERS.map((s) => s.name).join(", ")}`,
    );
  }

  const args = ["mcp", "add", "--transport", transport];
  if (overrides.scope) args.push("--scope", overrides.scope);
  args.push(name);
  if (url) args.push(url);
  else if (known?.command) args.push(known.command, ...(known.args ?? []));
  return args;
}
