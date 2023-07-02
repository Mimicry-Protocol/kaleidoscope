import { Decimal } from 'decimal.js';
import { Value } from '../../types';

/**
 * Return the median Value of the list of Values.
 * If the list has an even number of Values, return the mean of the two middle Values.
 */
export function median(_values: Value[]): Value {
  if (_values.length === 0) {
    throw new Error('Cannot calculate median of empty array');
  } else if (_values.length === 1) {
    return _values[0];
  }

  // Check if all currencies are the same
  const currency = _values[0].currencyInfo;
  for (const value of _values) {
    if (value.currencyInfo.symbol !== currency.symbol) {
      throw new Error(
        'All Values must be in the same currency to calculate median.'
      );
    }
  }

  // sort _values by their decimal amount
  _values.sort((a, b) => a.amount.decimal.comparedTo(b.amount.decimal));

  const midIndex = Math.floor(_values.length / 2);

  // if _values has an even length, calculate the average of the two middle amounts
  if (_values.length % 2 === 0) {
    const midVal1 = _values[midIndex - 1].amount.decimal;
    const midVal2 = _values[midIndex].amount.decimal;
    const average = Decimal.div(Decimal.add(midVal1, midVal2), 2);

    // create a new Value object with the calculated median
    return {
      currencyInfo: _values[midIndex].currencyInfo, // assuming all _values have the same currencyInfo
      amount: {
        atomic: BigInt(
          average
            .times(10 ** _values[midIndex].currencyInfo.decimals)
            .toFixed(0)
        ), // convert decimal value times 10 to the power of decimals to bigint
        decimal: average,
      },
    };
  } else {
    // if _values has an odd length, return the middle Value
    return _values[midIndex];
  }
}
