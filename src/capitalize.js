// Upper-cases the first character of text, leaving the rest unchanged.
export function capitalize(text) {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string");
  }
  if (text.length === 0) {
    return "";
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}