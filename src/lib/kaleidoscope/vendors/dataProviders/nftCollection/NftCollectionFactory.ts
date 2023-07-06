import { Timeframe } from '../../../../enums';
import { ConsensusMechanism, ContractPointer, Value } from '../../../../types';
import { RestfulFactory } from '../RestfulFactory';
import { NftCollectionDataProvider } from './NftCollectionDataProvider';
import { CoinGeckoNonFungible } from './workers/CoinGeckoNonFungible';
import { CoinGeckoProNonFungible } from './workers/CoinGeckoProNonFungible';
import { DiaNonFungible } from './workers/DiaNonFungible';
import { NftBank } from './workers/NftBank';
import { NftGo } from './workers/NftGo';
import { Reservoir } from './workers/Reservoir';

// @ts-ignore
export class NftCollectionFactory extends RestfulFactory {
  private _dataProviders: {
    [key: string]: NftCollectionDataProvider;
  } = {};

  constructor(_globalConfig: any) {
    super(_globalConfig);
    this.initProviders(_globalConfig.dataProviders.nfts);
  }

  addDataProvider(_providerName: string, _providerConfig: any) {
    switch (_providerName) {
      case 'dia':
        this._dataProviders[_providerName] = new DiaNonFungible(
          _providerConfig
        );
        break;
      case 'nftBank':
        this._dataProviders[_providerName] = new NftBank(_providerConfig);
        break;
      case 'reservoir':
        this._dataProviders[_providerName] = new Reservoir(_providerConfig);
        break;
      case 'coinGecko':
        this._dataProviders[_providerName] = new CoinGeckoNonFungible(
          _providerConfig
        );
        break;
      case 'coinGeckoPro':
        this._dataProviders[_providerName] = new CoinGeckoProNonFungible(
          _providerConfig
        );
        break;
      case 'nftGo':
        this._dataProviders[_providerName] = new NftGo(_providerConfig);
        break;
      default:
        throw new Error(
          `${_providerName} is not a valid NftCollectionDataProvider.`
        );
    }
  }

  async getFloors(
    _contracts: ContractPointer[],
    _consensusMechanism?: ConsensusMechanism,
    _providerName?: string
  ): Promise<Value[]> {
    const values: Value[] = [];
    for (const _contract of _contracts) {
      const value = await this.getFloor(
        _contract,
        _consensusMechanism,
        _providerName
      );
      values.push(value);
    }

    return values;
  }

  async getFloor(
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
      'getFloor',
      [_contract],
      _consensusMechanism
    );
  }

  async getFloorChart(
    _contract: ContractPointer,
    _providerName: string,
    _timeframe?: Timeframe
  ): Promise<any> {
    const providers = this.getCorrectProviders(
      this._dataProviders,
      _providerName
    );
    return this.runFactory(providers, 'getFloorChart', [_contract, _timeframe]);
  }

  async getMetadata(
    _contract: ContractPointer,
    _providerName: string
  ): Promise<any> {
    const providers = this.getCorrectProviders(
      this._dataProviders,
      _providerName
    );
    return this.runFactory(providers, 'getMetadata', [_contract]);
  }
}
