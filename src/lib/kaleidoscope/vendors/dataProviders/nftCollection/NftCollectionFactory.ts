import { ConsensusMechanism, ContractPointer, Value } from '../../../../types';
import { RestfulFactory } from '../RestfulFactory';
import { NftCollectionDataProvider } from './NftCollectionDataProvider';
import { DiaNonFungible } from './workers/DiaNonFungible';
import { NftBank } from './workers/NftBank';

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
      case 'nftBank':
        this._dataProviders.push(new NftBank(_apiKey));
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
    const values: Value[] = [];
    const sources: any[] = [];
    for (const _provider of this._dataProviders) {
      const value: Value = await _provider.getFloor(_contract);
      console.log(_provider.getName());
      values.push(value);

      sources.push({
        source: _provider.getName(),
        value: value.amount,
      });
    }

    const value = this.applyConsensusMechanism(values, _consensusMechanism);
    const returnValue = {
      data: {
        currencyInfo: value.currencyInfo,
        floor: value.amount,
        sources: sources,
      },
    };

    return returnValue;
  }
}
