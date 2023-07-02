import { Decimal } from 'decimal.js';
import { Value } from '../../types';

/**
 * Return the mean Value of the list of Values.
 */
export function mean(values: Value[]): Value {
  if (values.length === 0) {
    throw new Error('Cannot calculate mean of empty array');
  } else if (values.length === 1) {
    return values[0];
  }

  // Check if all currencies are the same
  const currency = values[0].currencyInfo;
  for (const value of values) {
    if (value.currencyInfo.symbol !== currency.symbol) {
      throw new Error(
        'All values must be in the same currency to calculate mean'
      );
    }
  }

  // Compute the sum of all decimal amounts
  let decimalSum = new Decimal(0);
  for (const value of values) {
    decimalSum = decimalSum.plus(value.amount.decimal);
  }

  // Compute the mean (average)
  const meanDecimal = decimalSum.dividedBy(values.length);

  // Convert the mean decimal amount to atomic
  const meanAtomic = BigInt(
    meanDecimal.times(new Decimal(10).pow(currency.decimals)).toFixed(0)
  );

  return {
    currencyInfo: currency,
    amount: {
      atomic: meanAtomic,
      decimal: meanDecimal,
    },
  };
}
