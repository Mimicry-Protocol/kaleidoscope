import { IOHLCV } from 'candlestick-convert';

export function ticksToIOCHLV(_ticks: [number, number][]): IOHLCV[] {
  if (_ticks.length === 0) {
    throw new Error('No ticks provided.');
  }

  // Sort ticks by time in ascending order
  _ticks.sort((a, b) => a[0] - b[0]);

  // Assume the first price as previous close for the first tick
  let previousClose = _ticks[0][1];

  return _ticks.map(([time, price]) => {
    const open = previousClose;
    const close = price;

    const high = Math.max(open, close);
    const low = Math.min(open, close);

    const ohlcv = {
      time: time,
      open: open,
      high: high,
      low: low,
      close: close,
      volume: 0,
    };

    // Update previousClose for the next tick
    previousClose = close;

    return ohlcv;
  });
}
