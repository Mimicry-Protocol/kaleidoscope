import { Chain, CurrencySymbol } from '../../enums';
import { CurrencyInfo } from '../../types';
import { currencyInfoFromSymbol } from './currencyFromSymbol';

/**
 * Given a Chain, return the CurrencyInfo.
 */
export function currencyInfoFromChain(_chain?: Chain): CurrencyInfo {
  switch (_chain) {
    case undefined:
    case Chain.ARBITRUM:
    case Chain.OPTIMISM:
    case Chain.ETHEREUM:
      return currencyInfoFromSymbol(CurrencySymbol.ETH);
    case Chain.POLYGON:
      return currencyInfoFromSymbol(CurrencySymbol.MATIC);
    case Chain.SOLANA:
      return currencyInfoFromSymbol(CurrencySymbol.SOL);
    case Chain.BSC:
        return currencyInfoFromSymbol(CurrencySymbol.BNB);
    case Chain.KLAYTN:
      return currencyInfoFromSymbol(CurrencySymbol.KLAY);
    case Chain.AVALANCHE:
      return currencyInfoFromSymbol(CurrencySymbol.AVAX);
    default:
      throw new Error(`${_chain} is not a valid chain.`);
  }
}
