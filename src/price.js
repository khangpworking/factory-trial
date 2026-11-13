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
  const sign = cents < 0 ? "-" : "";
  const absolute = Math.abs(cents);
  const whole = String(Math.floor(absolute / 100)).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ",",
  );
  const fraction = String(absolute % 100).padStart(2, "0");
  return `${sign}${symbol}${whole}.${fraction}`;
}
