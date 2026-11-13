// Formats an integer amount of minor units (cents) as a price string.
export function formatPrice(cents, currency = "USD") {
  if (!Number.isInteger(cents)) {
    throw new TypeError("cents must be an integer");
  }
  const symbols = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency];
  if (symbol === undefined) {
    throw new RangeError(`unsupported currency: ${currency}`);
  }
  const whole = Math.floor(cents / 100);
  const fraction = String(cents % 100).padStart(2, "0");
  return `${symbol}${whole}.${fraction}`;
}
