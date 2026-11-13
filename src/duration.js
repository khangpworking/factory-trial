// Parses a duration such as "1h30m" or "45s" into a number of seconds.
const UNITS = { h: 3600, m: 60, s: 1 };

export function parseDuration(text) {
  if (typeof text !== "string" || !/^(\d+[hms])+$/.test(text)) {
    throw new SyntaxError(`not a duration: ${text}`);
  }
  let seconds = 0;
  for (const [, amount, unit] of text.matchAll(/(\d+)([hms])/g)) {
    seconds += Number(amount) * UNITS[unit];
  }
  return seconds;
}
