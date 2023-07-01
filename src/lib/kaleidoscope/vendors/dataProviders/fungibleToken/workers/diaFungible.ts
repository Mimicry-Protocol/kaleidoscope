import { ContractPointer, Value } from '../../../../../types';
import { RestfulProvider } from '../../RestfulProvider';
import { FungibleDataProvider } from '../FungibleDataProvider';

export class DiaFungible extends RestfulProvider
  implements FungibleDataProvider {
  constructor(_config: any) {
    const apiHost = 'https://api.diadata.org/v1/';
    super(_config, apiHost);
  }

  async getPrice(_contracts: ContractPointer): Promise<Value> {
    throw new Error('Method not implemented: getPrice()');
  }
}
