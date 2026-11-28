export function shortestWord(text) {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string");
  }

  const words = text.split(/\s+/).filter((word) => word !== "");
  if (words.length === 0) {
    return "";
  }

  let shortest = words[0];
  for (const word of words) {
    if (word.length < shortest.length) {
      shortest = word;
    }
  }
  return shortest;
}