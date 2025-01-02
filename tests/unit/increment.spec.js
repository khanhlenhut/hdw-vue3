import { describe, it, test, expect } from "vitest";
import { increment } from "../../src/utils/increment.js";

describe("increment", () => {
  test("increments the current number by 1", () => {
    expect(increment(0, 10)).toEqual(1);
  });

  it("dose not increment the current number over the max", () => {
    expect(increment(100, 10)).toBe(100);
  });

  test("has a default max of 10", () => {
    expect(increment(10)).toBe(10);
  });
});
