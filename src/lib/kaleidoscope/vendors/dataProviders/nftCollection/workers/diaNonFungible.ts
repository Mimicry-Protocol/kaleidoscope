import { Chain, CurrencySymbol } from '../../../../../enums';
import { ContractPointer, Value } from '../../../../../types';
import { RestfulProvider } from '../../RestfulProvider';
import { NftCollectionDataProvider } from '../NftCollectionDataProvider';
import { numberToValue } from '../../../../../utils/numberToValue';

// Docs: https://docs.diadata.org/documentation/api-1/nft-data-api-endpoints

export class DiaNonFungible extends RestfulProvider
  implements NftCollectionDataProvider {
  constructor(_apiKey: string) {
    const apiHost = 'https://api.diadata.org/v1/';
    super(_apiKey, apiHost);
  }

  // https://api.diadata.org/v1/NFTFloor/:blockchain/:address
  async getFloor(_contract: ContractPointer): Promise<Value> {
    const host = this.getApiHost();
    const chain = this.getBlockchain(_contract.chain);
    const uri = `${host}NFTFloor/${chain}/${_contract.address}`;
    const json: any = this.fetchJson(uri);
    
    // DIA currently only supports ETH.
    const currencyInfo = this.getCurrencyInfo(CurrencySymbol.ETH);
    return numberToValue(Number(json.Floor_Price), currencyInfo);
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
}
