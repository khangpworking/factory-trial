export function average(numbers) {
  if (!Array.isArray(numbers)) throw new TypeError('average expects an array of numbers');
  if (numbers.length === 0) throw new RangeError('average of an empty list');
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  return numbers.length === 1 ? numbers[0] : sum / numbers.length;
}
