import { Value } from '../../types';

/**
 * Return a random value from the list
 */
export function random(values: Value[]): Value {
  if (values.length === 0) {
    throw new Error('Cannot select a random Value from an empty array');
  }
  const randomIndex: number = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}
