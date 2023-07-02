import { Chain } from '../../enums';

/**
 * Given a chain, return the blockchain explorer's host URI.
 */
export function chainToBlockchainExplorerHost(
  _chain?: Chain
): string {
  switch (_chain) {
    case undefined:
    case Chain.ETHEREUM:
      return 'https://etherscan.io';
    case Chain.POLYGON:
      return 'https://polygonscan.com';
    case Chain.SOLANA:
      return 'https://explorer.solana.com';
    case Chain.BSC:
      return 'https://bscscan.com';
    case Chain.ARBITRUM:
      return 'https://arbiscan.io';
    case Chain.OPTIMISM:
      return 'https://optimistic.etherscan.io';
    default:
      throw new Error(`Cannot find blockchain explorer using unknown chain: ${_chain}`);
  }
}
