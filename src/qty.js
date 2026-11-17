// Reads the quantity from a product label such as "3 pcs", "2 x 500g" or "box of 12".
// Returns null when the label carries no quantity at all.
export function parseQty(label) {
  if (typeof label !== "string") {
    throw new TypeError("label must be a string");
  }
  const out = {};
  const text = label.toLowerCase();

  if (/\b(box|pack)\b/.test(text)) {
    const n = text.match(/\bof (\d+)\b/);
    // A box or pack without a count: the total quantity is unknown.
    if (!n) return out;
    out.count = Number(n[1]);
    return out;
  }

  const multi = text.match(/(\d+)\s*x\s*(\d+)\s*(g|ml)\b/);
  if (multi) {
    out.count = Number(multi[1]);
    out.size = Number(multi[2]);
    out.unit = multi[3];
    return out;
  }

  const pcs = text.match(/(\d+)\s*pcs\b/);
  if (pcs) out.count = Number(pcs[1]);
  const size = text.match(/(\d+)\s*(g|ml)\b/);
  if (size) {
    out.size = Number(size[1]);
    out.unit = size[2];
  }
  return Object.keys(out).length ? out : null;
}
