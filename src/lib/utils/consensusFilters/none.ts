import { Value } from '../../types';

/**
 * Return all _values with no filtering
 *
 * @param _values A list of Values
 * @returns The original list of Values
 */
export function none(_values: Value[]): Value[] {
  return _values;
}
