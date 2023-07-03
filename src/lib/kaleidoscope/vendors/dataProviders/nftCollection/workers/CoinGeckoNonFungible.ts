import { Chain } from '../../../../../enums';
import { ContractPointer, Value } from '../../../../../types';
import { RestfulProvider } from '../../RestfulProvider';
import { NftCollectionDataProvider } from '../NftCollectionDataProvider';
import { numberToValue } from '../../../../../utils/numberToValue';

// Docs: https://www.coingecko.com/en/api/documentation

export class CoinGeckoNonFungible extends RestfulProvider
  implements NftCollectionDataProvider {
  constructor(_config: any) {
    const apiHost = 'https://api.coingecko.com/api/v3/';
    super(_config, apiHost);
  }

  // https://api.coingecko.com/api/v3/nfts/{chain}/contract/{contract_address}
  async getFloor(_contract: ContractPointer): Promise<Value> {
    const host = this.getApiHost();
    const chain = this.getBlockchain(_contract.chain);
    const uri = `${host}nfts/${chain}/contract/${_contract.address}`;
    const json: any = await this.gotJson(uri);
    const currencyInfo = this.getCurrencyInfoFromChain(_contract.chain);
    return numberToValue(
      Number(json.floor_price.native_currency),
      currencyInfo
    );
  }

  async getMetadata(_contract: ContractPointer): Promise<any> {
    throw new Error('Method not implemented.');
  }

  getBlockchain(_chain?: Chain): string {
    switch (_chain) {
      case undefined:
      case Chain.ETHEREUM:
        return 'ethereum';
      case Chain.BSC:
        return 'binance-smart-chain';
      case Chain.POLYGON:
        return 'polygon-pos';
      case Chain.ARBITRUM:
        return 'arbitrum-one';
      case Chain.SOLANA:
        throw new Error(
          'Solana is supported by CoinGecko, but not yet implemented.'
        );
      // return 'solana';
      case Chain.OPTIMISM:
        return 'optimistic-ethereum';
      case Chain.AVALANCHE:
        return 'avalanche';
      case Chain.KLAYTN:
        return 'klay-token';
      default:
        throw new Error(`${_chain} is not supported by ${this.getName()}.`);
    }
  }

  getName(): string {
    return 'CoinGecko';
  }
}
