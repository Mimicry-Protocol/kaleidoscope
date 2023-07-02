import { Decimal } from 'decimal.js';
import { Value } from '../../types';

/**
 * Return all _values that fall within the Mean Absolute Deviation of the mean
 *
 * @param _values A list of Values
 * @returns A filtered list of Values
 */
export function mad(_values: Value[]): Value[] {
  if (_values.length === 0) return _values;

  const mean: Decimal = _values
    .reduce(
      (acc: Decimal, val: Value) => acc.plus(val.amount.decimal),
      new Decimal(0)
    )
    .dividedBy(_values.length);

  const deviations: Decimal[] = _values.map(val =>
    val.amount.decimal.minus(mean).absoluteValue()
  );

  const meanAbsoluteDeviation: Decimal = deviations
    .reduce((acc: Decimal, val: Decimal) => acc.plus(val), new Decimal(0))
    .dividedBy(deviations.length);

  // Calculate the lower and upper bounds of the filtered range
  const lowerBound: Decimal = mean.minus(meanAbsoluteDeviation);
  const upperBound: Decimal = mean.plus(meanAbsoluteDeviation);

  // Filter the _values that fall within the range
  const filteredValues: Value[] = _values.filter(
    val =>
      val.amount.decimal.greaterThanOrEqualTo(lowerBound) &&
      val.amount.decimal.lessThanOrEqualTo(upperBound)
  );

  return filteredValues;
}
