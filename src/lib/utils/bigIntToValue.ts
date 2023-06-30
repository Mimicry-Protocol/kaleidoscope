import { Decimal } from 'decimal.js';
import { CurrencyInfo, Value } from '../types';

/**
 * Given a bigint and CurrencyInfo, return an Value object.
 */
export function bigIntToValue(
  _value: bigint,
  _currencyInfo: CurrencyInfo
): Value {
  const decimal = new Decimal(Number(_value) / Math.pow(10, _currencyInfo.decimals));
  const atomic = _value;

  return {
    currencyInfo: _currencyInfo,
    amount: {
      atomic,
      decimal,
    },
  };
}
