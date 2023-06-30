import { mad } from '../../../../src/lib/utils/consensusFilters/mad';
import { Decimal } from 'decimal.js';
import { Amount, CurrencyInfo, Value } from '../../../../src/lib/types';
import { CurrencySymbol } from '../../../../src/lib/enums';

describe('mad function', () => {
  const currencyInfo: CurrencyInfo = {
    symbol: CurrencySymbol.ETH,
    name: 'Ethereum',
    decimals: 18,
  };

  it('returns an empty array when input is empty', () => {
    const values: Value[] = [];
    expect(mad(values)).toEqual([]);
  });

  it('returns same array when all elements are the same', () => {
    const amount: Amount = {
      atomic: BigInt(5000000000000000000),
      decimal: new Decimal(5),
    };

    const value: Value = {
      currencyInfo: currencyInfo,
      amount: amount,
    };

    const values: Value[] = [value, value, value];
    expect(mad(values)).toEqual(values);
  });

  it('filters out outliers', () => {
    const amount1: Amount = {
      atomic: BigInt(5000000000000000000),
      decimal: new Decimal(5),
    };

    const amount2: Amount = {
      atomic: BigInt(10000000000000000000),
      decimal: new Decimal(10),
    };

    const amount3: Amount = {
      atomic: BigInt(15000000000000000000),
      decimal: new Decimal(15),
    };

    const amount4: Amount = {
      atomic: BigInt(100000000000000000000),
      decimal: new Decimal(100),
    };

    const value1: Value = {
      currencyInfo: currencyInfo,
      amount: amount1,
    };

    const value2: Value = {
      currencyInfo: currencyInfo,
      amount: amount2,
    };

    const value3: Value = {
      currencyInfo: currencyInfo,
      amount: amount3,
    };

    const value4: Value = {
      currencyInfo: currencyInfo,
      amount: amount4,
    };

    const values: Value[] = [value1, value2, value3, value4];
    expect(mad(values)).toEqual([value1, value2, value3]);
  });
});
