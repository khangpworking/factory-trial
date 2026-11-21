// Upper-cases the first letter of every word, separated by single spaces.
export function titleCase(text) {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string");
  }
  if (text.length === 0) {
    return "";
  }

  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
