// Reports whether text is empty or contains only whitespace.
export function isBlank(text) {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string");
  }

  return text.trim().length === 0;
}
