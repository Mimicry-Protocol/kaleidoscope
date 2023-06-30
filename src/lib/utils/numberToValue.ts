import { CurrencyInfo, Value } from '../types';
import { bigIntToValue } from './bigIntToValue';
import { numberToBigInt } from './numberToBigInt';

/**
 * Given a number and CurrencyInfo, return a bigint.
 */
export function numberToValue(
  _value: number,
  _currencyInfo: CurrencyInfo
): Value {
  const bigValue = numberToBigInt(_value, _currencyInfo);
  return bigIntToValue(bigValue, _currencyInfo);
}
