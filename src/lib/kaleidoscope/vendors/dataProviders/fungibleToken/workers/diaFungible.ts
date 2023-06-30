import { ContractPointer } from '../../../../../types';
import { RestfulProvider } from '../../RestfulProvider';
import { FungibleDataProvider } from '../FungibleDataProvider';

export class DiaFungible extends RestfulProvider
  implements FungibleDataProvider {
  constructor(_apiKey: string) {
    const apiHost = 'https://api.diadata.org/v1/';
    super(_apiKey, apiHost);
  }

  async getPrice(_contracts: ContractPointer): Promise<bigint> {
    throw new Error('Method not implemented: getPrice()');
  }
}
