import { ConsensusMechanism, ContractPointer } from '../../../../types';
import { RestfulFactory } from '../RestfulFactory';
import { FungibleDataProvider } from './FungibleDataProvider';
import { DiaFungible } from './workers/diaFungible';

// @ts-ignore
export class FungibleFactory extends RestfulFactory {
  private _dataProviders: FungibleDataProvider[] = [];

  constructor(_providers: any) {
    super(_providers);
    this.initProviders(_providers);
  }

  addDataProvider(_providerName: string, _apiKey: string) {
    switch (_providerName) {
      case 'dia':
        this._dataProviders.push(new DiaFungible(_apiKey));
        break;
      default:
        throw new Error(
          `${_providerName} is not a valid FungibleDataProvider.`
        );
    }
  }

  async getPrices(
    _contracts: ContractPointer[],
    _consensusMechanism?: ConsensusMechanism
  ): Promise<bigint[]> {
    const values: bigint[] = [];
    for (const _contract of _contracts) {
      const value = await this.getPrice(_contract, _consensusMechanism);
      values.push(value);
    }

    return values;
  }

  async getPrice(
    _contract: ContractPointer,
    _consensusMechanism?: ConsensusMechanism
  ): Promise<bigint> {
    const values: bigint[] = [];
    for (const _provider of this._dataProviders) {
      const value = await _provider.getPrice(_contract);
      values.push((value as unknown) as bigint);
    }

    const value = this.applyConsensusMechanism(values, _consensusMechanism);
    return value;
  }
}
