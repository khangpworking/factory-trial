// Sums the decimal digits of an integer, using its absolute value.
export function sumDigits(n) {
  if (!Number.isInteger(n)) {
    throw new TypeError("n must be an integer");
  }

  let total = 0;
  let value = Math.abs(n);
  while (value > 0) {
    total += value % 10;
    value = Math.floor(value / 10);
  }
  return total;
}
