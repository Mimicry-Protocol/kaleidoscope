import { Chain } from '../../../../../enums';
import { ContractPointer, Value } from '../../../../../types';
import { RestfulProvider } from '../../RestfulProvider';
import { NftCollectionDataProvider } from '../NftCollectionDataProvider';
import { numberToValue } from '../../../../../utils/numberToValue';

// Docs: https://docs.nftgo.io/reference/introduction

export class NftGo extends RestfulProvider
  implements NftCollectionDataProvider {
  constructor(_config: any) {
    const apiHost = 'https://data-api.nftgo.io/';
    super(_config, apiHost);
  }

  // @see https://docs.nftgo.io/reference/get_metrics_eth_v1_collection__contract_address__metrics_get-1
  // {host}/{chain}/v1/collection/{contract_address}/metrics
  async getFloor(_contract: ContractPointer): Promise<Value> {
    const host = this.getApiHost();
    const chain = this.getBlockchain(_contract.chain);
    const uri = `${host}${chain}/v1/collection/${_contract.address}/metrics`;
    const options = {
      headers: {
        Accept: 'application/json',
        'X-API-KEY': this.getApiKey(),
      },
    };

    const json: any = await this.gotJson(uri, options);

    const currencyInfo = this.getCurrencyInfoFromChain(_contract.chain);
    return numberToValue(Number(json.floor_price.value), currencyInfo);
  }

  async getMetadata(_contract: ContractPointer): Promise<any> {
    throw new Error('Method not implemented.');
  }

  getBlockchain(_chain?: Chain): string {
    switch (_chain) {
      case undefined:
      case Chain.ETHEREUM:
        return 'eth';
      default:
        throw new Error(`${_chain} is not supported by ${this.getName()}.`);
    }
  }

  getName(): string {
    return 'NFTGo';
  }
}
