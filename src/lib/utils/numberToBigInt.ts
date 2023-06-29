import { CurrencyInfo } from '../types';

/**
 * Given a number and CurrencyInfo, return a bigint.
 */
export function numberToBigInt(
  _value: number,
  _currencyInfo: CurrencyInfo
): bigint {
  // Convert the value to a BigInt based on the decimals of the currency.
  const decimals: number = Number(_currencyInfo.decimals);
  const atomic: bigint = BigInt(_value * Math.pow(10, decimals));
  return atomic;
}
