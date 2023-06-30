import ky from "ky";
import { Chain } from '../../../../../enums';
import { ContractPointer } from '../../../../../types';
import { numberToBigInt } from '../../../../../utils/numberToBigInt';
import { RestfulProvider } from '../../RestfulProvider';
import { NftCollectionDataProvider } from '../NftCollectionDataProvider';

// Docs: https://docs.diadata.org/documentation/api-1/nft-data-api-endpoints

export class DiaNonFungible extends RestfulProvider
  implements NftCollectionDataProvider {
  constructor(_apiKey: string) {
    const apiHost = 'https://api.diadata.org/v1/';
    super(_apiKey, apiHost);
  }

  // https://api.diadata.org/v1/NFTFloor/:blockchain/:address
  async getFloor(_contract: ContractPointer): Promise<bigint> {
    const host = this.getApiHost();
    const chain = this.getBlockchain(_contract.chain);
    const uri = `${host}NFTFloor/${chain}/${_contract.address}`;

    try {
      const response: any = await ky.get(uri, this.getKyConfig()).json();
      const floor = response.Floor_Price;
      return numberToBigInt(Number(floor), 18);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  getBlockchain(_chain: Chain): string {
    switch (_chain) {
      case Chain.ETHEREUM:
        return 'Ethereum';
      default:
        throw new Error(`${_chain} is not a valid chain.`);
    }
  }
}
