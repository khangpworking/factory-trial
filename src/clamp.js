// Limits value to the inclusive range min..max.
export function clamp(value, min, max) {
  if (
    typeof value !== "number" ||
    typeof min !== "number" ||
    typeof max !== "number"
  ) {
    throw new RangeError("value, min and max must be numbers");
  }
  if (min > max) {
    throw new RangeError("min must not be greater than max");
  }

  return Math.min(Math.max(value, min), max);
}
