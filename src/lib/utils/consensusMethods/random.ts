/**
 * Return a random value from the list of BigInts
 */
export function random(values: Array<bigint>): bigint {
    const randomIndex: number = Math.floor(Math.random() * values.length);
    return values[randomIndex];
  }