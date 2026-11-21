export function wordInitials(text) {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string");
  }

  return text
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map((word) => word[0])
    .join("");
}
