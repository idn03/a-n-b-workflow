import { describe, it, expect } from "vitest";
import { add, multiply, clamp } from "../src/math.js";

describe("math", () => {
  it("add should return the sum of two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("multiply should return the product", () => {
    expect(multiply(3, 4)).toBe(12);
  });

  it("clamp should restrict value to range", () => {
    expect(clamp(5, 1, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });
});
