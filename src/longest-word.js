export function longestWord(text) {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string");
  }

  let longest = "";
  for (const word of text.split(/\s+/)) {
    if (word.length > longest.length) {
      longest = word;
    }
  }
  return longest;
}