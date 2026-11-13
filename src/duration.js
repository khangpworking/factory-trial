// Parses a duration such as "1d 2h30m" or "45s" into a number of seconds.
const UNIT_ORDER = ["d", "h", "m", "s"];
const UNITS = { d: 86400, h: 3600, m: 60, s: 1 };

export function parseDuration(text) {
  if (typeof text !== "string" || !/^\d+[dhms]( *\d+[dhms])*$/.test(text)) {
    throw new SyntaxError(`not a duration: ${text}`);
  }
  let seconds = 0;
  let lastIndex = -1;
  for (const [, amount, unit] of text.matchAll(/(\d+)([dhms])/g)) {
    const index = UNIT_ORDER.indexOf(unit);
    if (index <= lastIndex) {
      throw new SyntaxError(`not a duration: ${text}`);
    }
    lastIndex = index;
    seconds += Number(amount) * UNITS[unit];
  }
  return seconds;
}
