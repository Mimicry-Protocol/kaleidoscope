import { ContractPointer, Value } from '../../../../../types';
import { RestfulProvider } from '../../RestfulProvider';
import { FungibleDataProvider } from '../FungibleDataProvider';

export class CoinGeckoFungible extends RestfulProvider
  implements FungibleDataProvider {
  constructor(_config: any) {
    const apiHost = 'https://api.coingecko.com/api/v3/';
    super(_config, apiHost);
  }

  async getPrice(_contracts: ContractPointer): Promise<Value> {
    throw new Error('Method not implemented: getPrice()');
  }

  getName(): string {
    return 'CoinGecko';
  }
}
