import { describe, it, expect } from "vitest";
import { slugify, flagKey } from "../src/io/slug.js";

describe("slugify", () => {
  it("normalises to kebab-case", () => {
    expect(slugify("Checkout Redesign v2!")).toBe("checkout-redesign-v2");
  });
  it("falls back when empty", () => {
    expect(slugify("!!!", "fallback")).toBe("fallback");
  });
});

describe("flagKey", () => {
  it("uses the stem before a colon", () => {
    expect(flagKey("Decision stage: proposal, refinement, or build-ready?")).toBe(
      "decision-stage",
    );
  });
  it("handles questions without colons", () => {
    expect(flagKey("Figma URL?")).toBe("figma-url");
  });
});
