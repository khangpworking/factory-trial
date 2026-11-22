// Planted bug for the bug-fix template live test (code-factory task templates, 22/11/2026): the sum skips the last
// number, so average([2, 4, 6]) gives 2 instead of 4. The test below only checks a one-number list.
export function average(numbers) {
  if (!Array.isArray(numbers)) throw new TypeError('average expects an array of numbers');
  if (numbers.length === 0) throw new RangeError('average of an empty list');
  let sum = 0;
  for (let i = 0; i < numbers.length - 1; i++) sum += numbers[i];
  return numbers.length === 1 ? numbers[0] : sum / numbers.length;
}
