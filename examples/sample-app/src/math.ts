/** Adds two numbers. INTENTIONAL BUG: uses subtraction instead of addition. */
export function add(a: number, b: number): number {
  return a + b; // BUG: should be a + b
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}
