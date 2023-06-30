import { Decimal } from 'decimal.js';
import { Value, CurrencyInfo } from './../../../../src/lib/types';
import { CurrencySymbol } from './../../../../src/lib/enums';
import { median } from './../../../../src/lib/utils/consensusMethods/median';

describe('median', () => {
  const usdInfo: CurrencyInfo = {
    symbol: CurrencySymbol.USD,
    name: 'US Dollar',
    decimals: 2,
  };

  it('returns the middle value for an odd length array', () => {
    const values: Value[] = [
      {
        currencyInfo: usdInfo,
        amount: { atomic: BigInt(100), decimal: new Decimal(1) },
      },
      {
        currencyInfo: usdInfo,
        amount: { atomic: BigInt(300), decimal: new Decimal(3) },
      },
      {
        currencyInfo: usdInfo,
        amount: { atomic: BigInt(200), decimal: new Decimal(2) },
      },
    ];

    const result = median(values);

    expect(result.amount.decimal.toString()).toBe('2');
  });

  it('returns the average of the two middle values for an even length array', () => {
    const values: Value[] = [
      {
        currencyInfo: usdInfo,
        amount: { atomic: BigInt(100), decimal: new Decimal(1) },
      },
      {
        currencyInfo: usdInfo,
        amount: { atomic: BigInt(400), decimal: new Decimal(4) },
      },
      {
        currencyInfo: usdInfo,
        amount: { atomic: BigInt(300), decimal: new Decimal(3) },
      },
      {
        currencyInfo: usdInfo,
        amount: { atomic: BigInt(200), decimal: new Decimal(2) },
      },
    ];

    const result = median(values);

    expect(result.amount.decimal.toString()).toBe('2.5');
  });

  it('throws an error for an empty array', () => {
    const values: Value[] = [];

    expect(() => median(values)).toThrow(
      'Cannot calculate median of empty array'
    );
  });
});
