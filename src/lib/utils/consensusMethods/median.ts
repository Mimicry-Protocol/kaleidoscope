import { Decimal } from 'decimal.js';
import { Value } from '../../types';

/**
 * Return the median Value of the list of Values.
 * If the list has an even number of Values, return the mean of the two middle Values.
 */
export function median(values: Value[]): Value {
  if (values.length === 0) {
    throw new Error('Cannot calculate median of empty array');
  } else if (values.length === 1) {
    return values[0];
  }

  // sort values by their decimal amount
  values.sort((a, b) => a.amount.decimal.comparedTo(b.amount.decimal));

  const midIndex = Math.floor(values.length / 2);

  // if values has an even length, calculate the average of the two middle amounts
  if (values.length % 2 === 0) {
    const midVal1 = values[midIndex - 1].amount.decimal;
    const midVal2 = values[midIndex].amount.decimal;
    const average = Decimal.div(Decimal.add(midVal1, midVal2), 2);

    // create a new Value object with the calculated median
    return {
      currencyInfo: values[midIndex].currencyInfo, // assuming all values have the same currencyInfo
      amount: {
        atomic: BigInt(
          average.times(10 ** values[midIndex].currencyInfo.decimals).toFixed(0)
        ), // convert decimal value times 10 to the power of decimals to bigint
        decimal: average,
      },
    };
  } else {
    // if values has an odd length, return the middle Value
    return values[midIndex];
  }
}
