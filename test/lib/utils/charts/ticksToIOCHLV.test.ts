import { IOHLCV } from 'candlestick-convert';
import { ticksToIOCHLV } from '../../../../src/lib/utils/charts/ticksToIOCHLV';

describe('ticksToIOCHLV function', () => {
  it('should throw an error if _ticks is empty', () => {
    expect(() => ticksToIOCHLV([])).toThrow('No ticks provided.');
  });

  it('should calculate IOHLCV correctly', () => {
    const _ticks: [number, number][] = [
      [100, 1],
      [200, 2],
      [300, 1],
      [400, 2],
    ];

    const expected: IOHLCV[] = [
      {
        time: 100,
        open: 1,
        high: 1,
        low: 1,
        close: 1,
        volume: 0,
      },
      {
        time: 200,
        open: 1,
        high: 2,
        low: 1,
        close: 2,
        volume: 0,
      },
      {
        time: 300,
        open: 2,
        high: 2,
        low: 1,
        close: 1,
        volume: 0,
      },
      {
        time: 400,
        open: 1,
        high: 2,
        low: 1,
        close: 2,
        volume: 0,
      },
    ];

    expect(ticksToIOCHLV(_ticks)).toEqual(expected);
  });

  it('should handle out-of-order ticks correctly', () => {
    const _ticks: [number, number][] = [
      [300, 1],
      [100, 1],
      [400, 2],
      [200, 2],
    ];

    const expected: IOHLCV[] = [
      {
        time: 100,
        open: 1,
        high: 1,
        low: 1,
        close: 1,
        volume: 0,
      },
      {
        time: 200,
        open: 1,
        high: 2,
        low: 1,
        close: 2,
        volume: 0,
      },
      {
        time: 300,
        open: 2,
        high: 2,
        low: 1,
        close: 1,
        volume: 0,
      },
      {
        time: 400,
        open: 1,
        high: 2,
        low: 1,
        close: 2,
        volume: 0,
      },
    ];

    expect(ticksToIOCHLV(_ticks)).toEqual(expected);
  });
});
