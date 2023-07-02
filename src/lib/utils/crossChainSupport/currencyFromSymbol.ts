import { CurrencySymbol } from '../../enums';
import { CurrencyInfo } from '../../types';

/**
 * Given a CurrencySymbol, return the CurrencyInfo.
 */
export function currencyInfoFromSymbol(_symbol?: CurrencySymbol): CurrencyInfo {
  switch (_symbol) {
    case undefined:
    case CurrencySymbol.ETH:
      return {
        symbol: CurrencySymbol.ETH,
        name: 'Ethereum',
        decimals: 18,
      };
    case CurrencySymbol.MATIC:
      return {
        symbol: CurrencySymbol.MATIC,
        name: 'Matic',
        decimals: 18,
      };
    case CurrencySymbol.BNB:
      return {
        symbol: CurrencySymbol.BNB,
        name: 'Binance Coin',
        decimals: 18,
      };
    case CurrencySymbol.SOL:
      return {
        symbol: CurrencySymbol.SOL,
        name: 'Solana',
        decimals: 9,
      };
    case CurrencySymbol.KLAY:
      return {
        symbol: CurrencySymbol.KLAY,
        name: 'Klaytn',
        decimals: 18,
      };
    case CurrencySymbol.AVAX:
      return {
        symbol: CurrencySymbol.AVAX,
        name: 'Avalanche',
        decimals: 18,
      };
    case CurrencySymbol.USD:
      return {
        symbol: CurrencySymbol.USD,
        name: 'United States Dollar',
        decimals: 8,
      };
    default:
      throw new Error(`${_symbol} is not a valid CurrencySymbol.`);
  }
}
