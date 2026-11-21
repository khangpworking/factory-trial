// Reverses the order of the words in a string, separated by single spaces.
export function reverseWords(text) {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string");
  }
  if (text.length === 0) {
    return "";
  }

  return text.split(" ").reverse().join(" ");
}
