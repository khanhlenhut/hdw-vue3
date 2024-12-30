import { describe, it, expect } from "vitest";
import { sum } from "../../src/utils/sum.js";

describe("sum", () => {
  it("should return the correct sum for two positive integers", () => {
    const result = sum(3, 5);
    expect(result).toBe(8);
  });
});
