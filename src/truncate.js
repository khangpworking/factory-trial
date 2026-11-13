// Cuts text to at most maxLength characters, ending with an ellipsis when cut.
export function truncate(text, maxLength) {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string");
  }
  if (!Number.isInteger(maxLength) || maxLength < 1) {
    throw new RangeError("maxLength must be an integer of 1 or more");
  }

  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength - 1) + "…";
}
