// Counts the letters a, e, i, o, u in a string, ignoring case.
export function countVowels(text) {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string");
  }

  let count = 0;
  for (const char of text.toLowerCase()) {
    if ("aeiou".includes(char)) {
      count += 1;
    }
  }
  return count;
}
