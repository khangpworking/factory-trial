export function chunk(items, size) {
  if (!Array.isArray(items)) {
    throw new TypeError("items must be an array");
  }
  if (!Number.isInteger(size) || size < 1) {
    throw new RangeError("size must be a positive integer");
  }

  const groups = [];
  for (let i = 0; i < items.length; i += size) {
    groups.push(items.slice(i, i + size));
  }
  return groups;
}
