// Turns a title into a lowercase, dash-separated URL slug.
export function slugify(text) {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string");
  }
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
