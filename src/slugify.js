// Turns a title into a lowercase, dash-separated URL slug.
export function slugify(text, maxLength) {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string");
  }
  if (maxLength !== undefined && (!Number.isInteger(maxLength) || maxLength <= 0)) {
    throw new RangeError("maxLength must be a positive integer");
  }

  let slug = text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (maxLength !== undefined) {
    slug = slug.slice(0, maxLength).replace(/-+$/, "");
  }

  return slug;
}
