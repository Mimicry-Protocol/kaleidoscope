import { CurrencyInfo } from '../types';

/**
 * Given a number and CurrencyInfo, return a bigint.
 */
export function numberToBigInt(
  _value: number,
  _currencyInfo: CurrencyInfo
): bigint {
  return BigInt(_value * Math.pow(10, _currencyInfo.decimals));
}
