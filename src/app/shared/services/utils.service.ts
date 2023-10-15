import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  /**
   * Returns an array of numbers that starts at `start` and ends at `end - 1`.
   * @param start The starting number of the range.
   * @param end The ending number of the range (exclusive).
   * @returns An array of numbers that starts at `start` and ends at `end - 1`.
   *
   * @example
   * const numbers = utils.range(1, 6); // Returns [1, 2, 3, 4, 5]
   */
  public range(start: number, end: number): number[] {
    // Create a new array with length equal to `end - start`, and initialize each element to its index value
    const array = [...Array(end - start).keys()];

    // Add `start` to each element of the array to get the final range of numbers
    return array.map((el) => el + start);
  }
}
