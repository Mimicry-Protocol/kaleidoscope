import { ContractPointer, Value } from '../../../../../types';
import { RestfulProvider } from '../../RestfulProvider';
import { NftCollectionDataProvider } from '../NftCollectionDataProvider';
import { numberToValue } from '../../../../../utils/numberToValue';

// Docs: https://docs.reservoir.tools/

export class Reservoir extends RestfulProvider
  implements NftCollectionDataProvider {
  constructor(_apiKey: string) {
    const apiHost = 'https://api.reservoir.tools/';
    super(_apiKey, apiHost);
  }

  // @see https://docs.reservoir.tools/reference/getstatsv2
  // https://api.reservoir.tools/stats/v2
  async getFloor(_contract: ContractPointer): Promise<Value> {
    const host = this.getApiHost();
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

  getName(): string {
    return 'Reservoir';
  }
}
