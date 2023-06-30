import { Chain } from '../../../../../enums';
import { ContractPointer, Value } from '../../../../../types';
import { RestfulProvider } from '../../RestfulProvider';
import { NftCollectionDataProvider } from '../NftCollectionDataProvider';
import { numberToValue } from '../../../../../utils/numberToValue';

// Docs: https://developer.nftbank.ai/reference/

export class NftBank extends RestfulProvider
  implements NftCollectionDataProvider {
  constructor(_apiKey: string) {
    const apiHost = 'https://api.nftbank.run/v1/';
    super(_apiKey, apiHost);
  }

  // @see https://developer.nftbank.ai/reference/floor_price_v1_collection__assetcontract__floor_get
  // https://api.nftbank.run/v1/collection/{assetContract}/floor?networkId={networkId}
  async getFloor(_contract: ContractPointer): Promise<Value> {
    const host = this.getApiHost();
    const chain = this.getBlockchain(_contract.chain);
    const uri =
      host +
      'collection/' +
      _contract.address +
      '/floor' +
      '?' +
      new URLSearchParams({
        networkId: chain,
      });

    const json: any = await this.fetchJson(uri, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'x-api-key': this.getApiKey(),
      },
    });

    const currencyInfo = this.getCurrencyInfoFromChain(_contract.chain);
    return numberToValue(Number(json.data.floor.eth), currencyInfo);
  }

  getBlockchain(_chain?: Chain): string {
    switch (_chain) {
      case undefined:
      case Chain.ETHEREUM:
        return 'ethereum';
      default:
        throw new Error(`${_chain} is not a valid chain.`);
    }
  }

  getName(): string {
    return 'NFTBank';
  }
}
