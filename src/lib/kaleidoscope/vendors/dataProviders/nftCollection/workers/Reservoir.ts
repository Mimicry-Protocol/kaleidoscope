import { ContractPointer, Value } from '../../../../../types';
import { RestfulProvider } from '../../RestfulProvider';
import { NftCollectionDataProvider } from '../NftCollectionDataProvider';
import { numberToValue } from '../../../../../utils/numberToValue';
import { Chain } from '../../../../../enums';

// Docs: https://docs.reservoir.tools/

export class Reservoir extends RestfulProvider
  implements NftCollectionDataProvider {
  constructor(_config: any) {
    const apiHost = 'https://api.reservoir.tools/';
    super(_config, apiHost);
  }

  // @see https://docs.reservoir.tools/reference/getstatsv2
  // https://api.reservoir.tools/stats/v2
  async getFloor(_contract: ContractPointer): Promise<Value> {
    const host = this.getHost(_contract.chain);
    const uri = `${host}stats/v2/`;
    const options = {
      searchParams: {
        collection: _contract.address
      },
      headers: {
        Accept: 'application/json',
        'x-api-key': this.getApiKey(),
      },
    };

    // Reservoir doesn't use the last lowest sale price for floor, but rather
    // the average of the top bid and floor ask.
    const json: any = await this.gotJson(uri, options);
    const ask: number = Number(json.stats.market.floorAsk.price.amount.decimal);
    const bid: number = Number(json.stats.market.topBid.price.amount.decimal);
    const floor: number = (ask + bid) / 2;

    const currencyInfo = this.getCurrencyInfoFromChain(_contract.chain);
    return numberToValue(floor, currencyInfo);
  }

  // https://api.reservoir.tools/collections/v5?id={contractAddress}
  async getMetadata(_contract: ContractPointer): Promise<any> {
    throw new Error('Method not implemented.');
  }

  getHost(_chain?: Chain): string {
    switch (_chain) {
      case undefined:
      case Chain.ETHEREUM:
        return this.getApiHost();
      case Chain.POLYGON:
        return 'https://api-polygon.reservoir.tools/';
      case Chain.BSC:
        return 'https://api-bsc.reservoir.tools/';
      case Chain.ARBITRUM:
        return 'https://api-arbitrum.reservoir.tools/';
      case Chain.OPTIMISM:
        return 'https://api-optimism.reservoir.tools/';
      default:
        throw new Error(`${_chain} is not a valid chain.`);
    }
  }

  getName(): string {
    return 'Reservoir';
  }
}
