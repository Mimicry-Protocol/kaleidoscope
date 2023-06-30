import { Value } from "../../types";

/**
 * Return a random value from the list
 */
export function random(values: Value[]): Value {
  const randomIndex: number = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}
