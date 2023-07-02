import { ConsensusFilter, ConsensusMethod } from '../../../../enums';
import { ConsensusMechanism, ContractPointer, Value } from '../../../../types';
import { RestfulFactory } from '../RestfulFactory';
import { NftCollectionDataProvider } from './NftCollectionDataProvider';
import { CoinGeckoNonFungible } from './workers/CoinGeckoNonFungible';
import { CoinGeckoProNonFungible } from './workers/CoinGeckoProNonFungible';
import { DiaNonFungible } from './workers/DiaNonFungible';
import { NftBank } from './workers/NftBank';
import { Reservoir } from './workers/Reservoir';

// @ts-ignore
export class NftCollectionFactory extends RestfulFactory {
  private _dataProviders: NftCollectionDataProvider[] = [];

  constructor(_globalConfig: any) {
    super(_globalConfig);
    this.initProviders(_globalConfig.dataProviders.nonFungibleTokens);
  }

  addDataProvider(_providerName: string, _providerConfig: any) {
    switch (_providerName) {
      case 'dia':
        this._dataProviders.push(new DiaNonFungible(_providerConfig));
        break;
      case 'nftBank':
        this._dataProviders.push(new NftBank(_providerConfig));
        break;
      case 'reservoir':
        this._dataProviders.push(new Reservoir(_providerConfig));
        break;
      case 'coinGecko':
        this._dataProviders.push(new CoinGeckoNonFungible(_providerConfig));
        break;
      case 'coinGeckoPro':
        this._dataProviders.push(new CoinGeckoProNonFungible(_providerConfig));
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

  async getMetadata(
    _contract: ContractPointer
  ): Promise<any> {
    return this.runFactory(
      this._dataProviders,
      'getMetadata',
      _contract,
      {
        filter: ConsensusFilter.NONE,
        method: ConsensusMethod.RANDOM
      }
    );
  }
}
