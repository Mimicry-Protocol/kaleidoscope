import { Chain } from '../../../../../enums';
import { ContractPointer, NFTCollectionMetadata, Value } from '../../../../../types';
import { RestfulProvider } from '../../RestfulProvider';
import { NftCollectionDataProvider } from '../NftCollectionDataProvider';
import { numberToValue } from '../../../../../utils/numberToValue';
import { chainToBlockchainExplorerHost } from '../../../../../utils/crossChainSupport';

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

  // /nfts/{asset_platform_id}/contract/{contract_address}
  async getMetadata(_contract: ContractPointer): Promise<any> {
    const host = this.getApiHost();
    const chain = this.getBlockchain(_contract.chain);
    const uri = `${host}nfts/${chain}/contract/${_contract.address}`;
    const json: any = await this.gotJson(uri);
    
    const currencyInfo = this.getCurrencyInfoFromChain(_contract.chain);
    const metadata: NFTCollectionMetadata = {
      contract: _contract,
      symbol: json.symbol,
      name: json.name,
      description: json.description,
      collectionSize: Number(json.total_supply),
      ownerCount: Number(json.number_of_unique_addresses),
      images: {
        thumbnail: json.image.small,
      },
      urls: {
        explorer: `${chainToBlockchainExplorerHost(_contract.chain)}/address/${
          _contract.address
        }`,
        website: json.links.homepage,
        discord: json.links.discord,
        twitter: json.links.twitter,
      },
      stats: {
        currencyInfo: currencyInfo,
        floor: {
          h24: numberToValue(Number(json.floor_price.native_currency), currencyInfo)
            .amount,
          h24Change: numberToValue(
            Number(json.floor_price_24h_percentage_change.native_currency),
            currencyInfo
          ).amount.decimal,
        },
        volume: {
          h24: numberToValue(Number(json.volume_24h.native_currency), currencyInfo)
            .amount,
          h24Change: numberToValue(
            Number(json.volume_24h_percentage_change.native_currency),
            currencyInfo
          ).amount.decimal,
        },
      },
    };

    return metadata;
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
