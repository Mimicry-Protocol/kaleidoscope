import { Decimal } from 'decimal.js';
import { Value, CurrencyInfo } from '../../../../src/lib/types';
import { CurrencySymbol } from '../../../../src/lib/enums';
import { mean } from '../../../../src/lib/utils/consensusMethods/mean';

describe('mean function', () => {
  const currency: CurrencyInfo = {
    symbol: CurrencySymbol.ETH,
    name: 'Ethereum',
    decimals: 18,
  };

  it('should calculate the mean of an array of values correctly', () => {
    const values: Value[] = [
      {
        currencyInfo: currency,
        amount: {
          atomic: BigInt('1000000000000000000'),
          decimal: new Decimal(1),
        },
      },
      {
        currencyInfo: currency,
        amount: {
          atomic: BigInt('2000000000000000000'),
          decimal: new Decimal(2),
        },
      },
      {
        currencyInfo: currency,
        amount: {
          atomic: BigInt('4000000000000000000'),
          decimal: new Decimal(4),
        },
      },
    ];
    const expectedMean: Value = {
      currencyInfo: currency,
      amount: {
        atomic: BigInt('2333333333333333333'), // The mean should round down to this number
        decimal: new Decimal('2.3333333333333333333'), // The mean decimal amount
      },
    };
    expect(mean(values)).toEqual(expectedMean);
  });

  it('should throw an error when the array is empty', () => {
    expect(() => mean([])).toThrow(Error);
  });

  it('should throw an error when values are in different currencies', () => {
    const differentCurrency: CurrencyInfo = {
      ...currency,
      symbol: CurrencySymbol.USD,
      name: 'US Dollar',
      decimals: 8,
    };
    const values: Value[] = [
      {
        currencyInfo: currency,
        amount: {
          atomic: BigInt('1000000000000000000'),
          decimal: new Decimal(1),
        },
      },
      {
        currencyInfo: differentCurrency,
        amount: {
          atomic: BigInt('100000000'),
          decimal: new Decimal(1),
        },
      },
    ];
    expect(() => mean(values)).toThrow(Error);
  });
});