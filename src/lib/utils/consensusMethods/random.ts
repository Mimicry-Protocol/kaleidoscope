import { Value } from '../../types';

/**
 * Return a random value from the list
 */
export function random(_values: Value[]): Value {
  if (_values.length === 0) {
    throw new Error('Cannot select a random Value from an empty array');
  }
  const randomIndex: number = Math.floor(Math.random() * _values.length);
  return _values[randomIndex];
}
