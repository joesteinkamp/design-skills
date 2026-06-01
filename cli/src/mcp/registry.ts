// Known MCP servers that designer skills reach for. URLs/commands are
// the canonical endpoints; users can override with --url.
export interface KnownMcpServer {
  name: string;
  transport: "http" | "sse" | "stdio";
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
