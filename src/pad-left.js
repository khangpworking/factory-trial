// Pads text on the left with fill up to width characters, for right-aligned output.
export function padLeft(text, width, fill = " ") {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string");
  }
  if (typeof fill !== "string" || fill.length !== 1) {
    throw new RangeError("fill must be exactly one character");
  }

  return text.padStart(width, fill);
}
