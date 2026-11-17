// Price per item, used by the shop report.
import { parseQty } from "../src/qty.js";

export function unitPrice(label, cents) {
  const q = parseQty(label);
  const count = q.count ?? 1;
  return Math.round(cents / count);
}
