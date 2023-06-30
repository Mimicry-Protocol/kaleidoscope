/**
 * Given a number and the number of decimal places, return a bigint.
 */
export function numberToBigInt(
  _value: number,
  _decimals: number
): bigint {
  return BigInt(_value * Math.pow(10, _decimals));
}
