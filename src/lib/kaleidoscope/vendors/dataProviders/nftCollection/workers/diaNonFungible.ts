import { Chain } from '../../../../../enums';
import { ContractPointer, Value } from '../../../../../types';
import { RestfulProvider } from '../../RestfulProvider';
import { NftCollectionDataProvider } from '../NftCollectionDataProvider';
import { numberToValue } from '../../../../../utils/numberToValue';

// Docs: https://docs.diadata.org/documentation/api-1/nft-data-api-endpoints

export class DiaNonFungible extends RestfulProvider
  implements NftCollectionDataProvider {
  constructor(_config: any) {
    const apiHost = 'https://api.diadata.org/v1/';
    super(_config, apiHost);
  }

  // https://api.diadata.org/v1/NFTFloor/:blockchain/:address
  async getFloor(_contract: ContractPointer): Promise<Value> {
    const host = this.getApiHost();
    const chain = this.getBlockchain(_contract.chain);
    const uri = `${host}NFTFloor/${chain}/${_contract.address}`;
    const json: any = await this.gotJson(uri);

    const currencyInfo = this.getCurrencyInfoFromChain(_contract.chain);
    return numberToValue(Number(json.Floor_Price), currencyInfo);
  }

  async getMetadata(_contract: ContractPointer): Promise<any> {
    throw new Error('Method not implemented.');
  }

  getBlockchain(_chain?: Chain): string {
    switch (_chain) {
      case undefined:
      case Chain.ETHEREUM:
        return 'Ethereum';
      default:
        throw new Error(`${_chain} is not a valid chain.`);
    }
  }

  getName(): string {
    return 'DIA';
  }
}
