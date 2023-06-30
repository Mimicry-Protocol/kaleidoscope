import { Decimal } from 'decimal.js';
import { Value } from '../../types';

/**
 * Return all values that fall within the Mean Absolute Deviation of the mean
 *
 * @param values A list of Values
 * @returns A filtered list of Values
 */
export function mad(values: Value[]): Value[] {
  if (values.length === 0) return values;

  const mean: Decimal = values
    .reduce(
      (acc: Decimal, val: Value) => acc.plus(val.amount.decimal),
      new Decimal(0)
    )
    .dividedBy(values.length);

  const deviations: Decimal[] = values.map(val =>
    val.amount.decimal.minus(mean).absoluteValue()
  );

  const meanAbsoluteDeviation: Decimal = deviations
    .reduce((acc: Decimal, val: Decimal) => acc.plus(val), new Decimal(0))
    .dividedBy(deviations.length);

  // Calculate the lower and upper bounds of the filtered range
  const lowerBound: Decimal = mean.minus(meanAbsoluteDeviation);
  const upperBound: Decimal = mean.plus(meanAbsoluteDeviation);

  // Filter the values that fall within the range
  const filteredValues: Value[] = values.filter(
    val =>
      val.amount.decimal.greaterThanOrEqualTo(lowerBound) &&
      val.amount.decimal.lessThanOrEqualTo(upperBound)
  );

  return filteredValues;
}
