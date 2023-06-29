/**
 * Return the median value of the list of bigints.
 * If the list has an even number of values, return the mean of the two middle values.
 */
export function median(values: Array<bigint>): bigint {
  const sortedValues: bigint[] = values.sort((a, b) =>
    a < b ? -1 : a > b ? 1 : 0
  );
  const middleIndex: number = Math.floor(sortedValues.length / 2);

  if (sortedValues.length % 2 === 0) {
    // Even number of values
    return (sortedValues[middleIndex] + sortedValues[middleIndex - 1]) / 2n;
  } else {
    // Odd number of values
    return sortedValues[middleIndex];
  }
}
