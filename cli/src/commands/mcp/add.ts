import { execa } from "execa";
import { buildAddArgs, type AddOverrides } from "../../mcp/registry.js";

export async function mcpAddCommand(name: string, opts: AddOverrides): Promise<void> {
  const args = buildAddArgs(name, opts);
  console.error(`Adding MCP server: claude ${args.join(" ")}`);
  await execa("claude", args, { stdio: "inherit" });
}
