import { execa } from "execa";

export async function mcpListCommand(): Promise<void> {
  await execa("claude", ["mcp", "list"], { stdio: "inherit" });
}
