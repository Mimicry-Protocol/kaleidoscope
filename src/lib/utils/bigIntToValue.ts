import { Decimal } from 'decimal.js';
import { CurrencyInfo, Value } from '../types';

/**
 * Given a bigint and CurrencyInfo, return an Value object.
 */
export function bigIntToValue(
  value: bigint,
  currencyInfo: CurrencyInfo
): Value {
  const decimals = Number(currencyInfo.decimals);
  const decimal = new Decimal(Number(value) / Math.pow(10, decimals));
  const atomic = value;

  return {
    currency: currencyInfo,
    amount: {
      atomic,
      decimal,
    },
  };
}
