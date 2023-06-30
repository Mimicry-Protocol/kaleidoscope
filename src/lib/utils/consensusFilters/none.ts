import { Value } from '../../types';

/**
 * Return all values with no filtering
 *
 * @param values A list of Values
 * @returns The original list of Values
 */
export function none(values: Value[]): Value[] {
  return values;
}
