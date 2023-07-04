import { ConsensusMechanism, ContractPointer, Value } from '../../../../types';
import { RestfulFactory } from '../RestfulFactory';
import { FungibleDataProvider } from './FungibleDataProvider';
import { CoinGeckoFungible } from './workers/CoinGeckoFungible';
import { DiaFungible } from './workers/DiaFungible';

// @ts-ignore
export class FungibleFactory extends RestfulFactory {
  private _dataProviders: {
    [key: string]: FungibleDataProvider;
  } = {};

  constructor(_globalConfig: any) {
    super(_globalConfig);
    this.initProviders(_globalConfig.dataProviders.fungibleTokens);
  }

  addDataProvider(_providerName: string, _providerConfig: any) {
    switch (_providerName) {
      case 'dia':
        this._dataProviders[_providerName] = new DiaFungible(_providerConfig);
        break;
      case 'coinGecko':
        this._dataProviders[_providerName] = new CoinGeckoFungible(_providerConfig);
        break;
      default:
        throw new Error(
          `${_providerName} is not a valid FungibleDataProvider.`
        );
    }
  }

  async getPrices(
    _contracts: ContractPointer[],
    _consensusMechanism?: ConsensusMechanism,
    _providerName?: string
  ): Promise<Value[]> {
    const values: Value[] = [];
    for (const _contract of _contracts) {
      const value = await this.getPrice(
        _contract,
        _consensusMechanism,
        _providerName
      );
      values.push(value);
    }

    return values;
  }

  async getPrice(
    _contract: ContractPointer,
    _consensusMechanism?: ConsensusMechanism,
    _providerName?: string
  ): Promise<any> {
    const providers = this.getCorrectProviders(
      this._dataProviders,
      _providerName
    );
    return this.runFactory(
      providers,
      'getPrice',
      _contract,
      _consensusMechanism
    );
  }
}
