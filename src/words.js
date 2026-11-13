// Counts words as runs of Unicode letters or digits, keeping inner apostrophes.
export function countWords(text) {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string");
  }

  const words = text.match(/[\p{L}\p{Nd}]+(?:['’][\p{L}\p{Nd}]+)*/gu);
  return words === null ? 0 : words.length;
}
