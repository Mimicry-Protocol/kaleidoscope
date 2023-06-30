import { ConsensusMechanism, ContractPointer, Value } from '../../../../types';
import { RestfulFactory } from '../RestfulFactory';
import { NftCollectionDataProvider } from './NftCollectionDataProvider';
import { DiaNonFungible } from './workers/DiaNonFungible';
import { NftBank } from './workers/NftBank';
import { Reservoir } from './workers/Reservoir';

// @ts-ignore
export class NftCollectionFactory extends RestfulFactory {
  private _dataProviders: NftCollectionDataProvider[] = [];

  constructor(_config: any) {
    super(_config);
    this.initProviders(_config.dataProviders.nonFungibleTokens);
  }

  addDataProvider(_providerName: string, _apiKey: string) {
    switch (_providerName) {
      case 'dia':
        this._dataProviders.push(new DiaNonFungible(_apiKey));
        break;
      case 'nftBank':
        this._dataProviders.push(new NftBank(_apiKey));
        break;
      case 'reservoir':
        this._dataProviders.push(new Reservoir(_apiKey));
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
  ): Promise<Value[]> {
    const values: Value[] = [];
    for (const _contract of _contracts) {
      const value = await this.getFloor(_contract, _consensusMechanism);
      values.push(value);
    }

    return values;
  }

  async getFloor(
    _contract: ContractPointer,
    _consensusMechanism?: ConsensusMechanism
  ): Promise<any> {
    return this.runFactory(
      this._dataProviders,
      'getFloor',
      _contract
    );
  }
}
