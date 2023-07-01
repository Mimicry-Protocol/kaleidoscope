import { ConsensusMechanism, ContractPointer, Value } from '../../../../types';
import { RestfulFactory } from '../RestfulFactory';
import { FungibleDataProvider } from './FungibleDataProvider';
import { DiaFungible } from './workers/DiaFungible';

// @ts-ignore
export class FungibleFactory extends RestfulFactory {
  private _dataProviders: FungibleDataProvider[] = [];

  constructor(_globalConfig: any) {
    super(_globalConfig);
    this.initProviders(_globalConfig.dataProviders.fungibleTokens);
  }

  addDataProvider(_providerName: string, _providerConfig: any) {
    switch (_providerName) {
      case 'dia':
        this._dataProviders.push(new DiaFungible(_providerConfig));
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
  ): Promise<Value[]> {
    const values: Value[] = [];
    for (const _contract of _contracts) {
      const value = await this.getPrice(_contract, _consensusMechanism);
      values.push(value);
    }

    return values;
  }

  async getPrice(
    _contract: ContractPointer,
    _consensusMechanism?: ConsensusMechanism
  ): Promise<Value> {
    const values: Value[] = [];
    for (const _provider of this._dataProviders) {
      const value = await _provider.getPrice(_contract);
      values.push(value);
    }

    const value = this.applyConsensusMechanism(values, _consensusMechanism);
    return value;
  }
}
