import { ConsensusMechanism, ContractPointer } from '../../../../types';
import { RestfulFactory } from '../RestfulFactory';
import { NftCollectionDataProvider } from './NftCollectionDataProvider';
import { DiaNonFungible } from './workers/diaNonFungible';

// @ts-ignore
export class NftCollectionFactory extends RestfulFactory {
  private _dataProviders: NftCollectionDataProvider[] = [];

  constructor(_providers: any) {
    super(_providers);
    this.initProviders(_providers);
  }

  addDataProvider(_providerName: string, _apiKey: string) {
    switch (_providerName) {
      case 'dia':
        this._dataProviders.push(new DiaNonFungible(_apiKey));
        break;
      default:
        throw new Error(
          `${_providerName} is not a valid NftCollectionDataProvider.`
        );
    }
  }

  async getFloors(
    _contracts: ContractPointer[],
    _consensusMechanism?: ConsensusMechanism
  ): Promise<bigint[]> {
    const values: bigint[] = [];
    for (const _contract of _contracts) {
      const value = await this.getFloor(_contract, _consensusMechanism);
      values.push(value);
    }

    return values;
  }

  async getFloor(
    _contract: ContractPointer,
    _consensusMechanism?: ConsensusMechanism
  ): Promise<bigint> {
    const values: bigint[] = [];
    for (const _provider of this._dataProviders) {
      const value = await _provider.getFloor(_contract);
      values.push((value as unknown) as any);
    }

    const value = this.applyConsensusMechanism(values, _consensusMechanism);
    return value;
  }
}
