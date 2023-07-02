import { Chain } from '../../../../../enums';
import { ContractPointer, Value } from '../../../../../types';
import { RestfulProvider } from '../../RestfulProvider';
import { NftCollectionDataProvider } from '../NftCollectionDataProvider';
import { numberToValue } from '../../../../../utils/numberToValue';

// Docs: https://www.coingecko.com/en/api/documentation
// Pro Docs: https://apiguide.coingecko.com/exclusive-endpoints/for-paid-plan-subscribers

export class CoinGeckoProNonFungible extends RestfulProvider
  implements NftCollectionDataProvider {
  constructor(_config: any) {
    const apiHost = 'https://pro-api.coingecko.com/api/v3/';
    super(_config, apiHost);
  }

  // {host}/nfts/{asset_platform_id}/contract/{contract_address}/market_chart
  async getFloorChart(_contract: ContractPointer): Promise<any> {
    const host = this.getApiHost();
    const chain = this.getBlockchain(_contract.chain);
    const uri = `${host}nfts/${chain}/contract/${_contract.address}/market_chart`;
    const options = {
      searchParams: {
        days: 14,
      },
      headers: {
        Accept: 'application/json',
        'x-cg-pro-api-key': this.getApiKey(),
      },
    };

    const json: any = await this.gotJson(uri, options);
    const currencyInfo = this.getCurrencyInfoFromChain(_contract.chain);
    let combinedResponse = {
      ...currencyInfo,
      ...json,
    };
    return combinedResponse;
  }

  // {host}/nfts/{chain}/contract/{contract_address}
  async getFloor(_contract: ContractPointer): Promise<Value> {
    const host = this.getApiHost();
    const chain = this.getBlockchain(_contract.chain);
    const uri = `${host}nfts/${chain}/contract/${_contract.address}`;
    const options = {
      headers: {
        Accept: 'application/json',
        'x-cg-pro-api-key': this.getApiKey(),
      },
    };

    const json: any = await this.gotJson(uri, options);
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
        return 'solana';
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
    return 'CoinGecko Pro';
  }
}
