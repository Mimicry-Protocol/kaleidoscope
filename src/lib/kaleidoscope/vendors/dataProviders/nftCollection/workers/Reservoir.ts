import { ContractPointer, NFTCollectionMetadata, Value } from '../../../../../types';
import { RestfulProvider } from '../../RestfulProvider';
import { NftCollectionDataProvider } from '../NftCollectionDataProvider';
import { numberToValue } from '../../../../../utils/numberToValue';
import { chainToBlockchainExplorerHost } from '../../../../../utils/crossChainSupport/chainToBlockchainExplorerHost';
import { Chain } from '../../../../../enums';

// Docs: https://docs.reservoir.tools/

export class Reservoir extends RestfulProvider
  implements NftCollectionDataProvider {
  constructor(_config: any) {
    const apiHost = 'https://api.reservoir.tools/';
    super(_config, apiHost);
  }

  // @see https://docs.reservoir.tools/reference/getstatsv2
  // https://api.reservoir.tools/stats/v2
  async getFloor(_contract: ContractPointer): Promise<Value> {
    const host = this.getHost(_contract.chain);
    const uri = `${host}stats/v2/`;
    const options = {
      searchParams: {
        collection: _contract.address
      },
      headers: {
        Accept: 'application/json',
        'x-api-key': this.getApiKey(),
      },
    };

    // Reservoir doesn't use the last lowest sale price for floor, but rather
    // the average of the top bid and floor ask.
    const json: any = await this.gotJson(uri, options);
    const ask: number = Number(json.stats.market.floorAsk.price.amount.decimal);
    const bid: number = Number(json.stats.market.topBid.price.amount.decimal);
    const floor: number = (ask + bid) / 2;

    const currencyInfo = this.getCurrencyInfoFromChain(_contract.chain);
    return numberToValue(floor, currencyInfo);
  }

  // https://docs.reservoir.tools/reference/getcollectionsv5
  // https://api.reservoir.tools/collections/v5?id={contractAddress}
  async getMetadata(_contract: ContractPointer): Promise<any> {
    const host = this.getHost(_contract.chain);
    const uri = `${host}collections/v5`;
    const options = {
      searchParams: {
        id: _contract.address
      },
      headers: {
        Accept: 'application/json',
        'x-api-key': this.getApiKey(),
      },
    };
    const json: any = await this.gotJson(uri, options);
    const collection = json.collections[0];

    const currencyInfo = this.getCurrencyInfoFromChain(_contract.chain);
    const metadata: NFTCollectionMetadata = {
      contract: _contract,
      name: collection.name,
      description: collection.description,
      createdAt: collection.createdAt,
      openseaVerificationStatus: (collection.openseaVerificationStatus === 'verified') ? true : false,
      openseaSlug: collection.slug,
      collectionSize: collection.tokenCount,
      onSaleCount: collection.onSaleCount,
      ownerCount: collection.ownerCount,
      contractType: collection.contractKind,
      images: {
        thumbnail: collection.image,
        banner: collection.banner,
        samples: collection.sampleImages,
      },
      urls: { 
        explorer: `${chainToBlockchainExplorerHost(_contract.chain)}/address/${_contract.address}`,
        website: collection.externalUrl,
        discord: collection.discordUrl,
        twitter: `https://twitter.com/${collection.twitterUsername}`,
      },
      stats: {
        currencyInfo: currencyInfo,
        // marketCap: null,
        floor: {
          h24: numberToValue(Number(collection.floorSale['1day']), currencyInfo).amount,
          h24Change: numberToValue(Number(collection.floorSaleChange['1day']), currencyInfo).amount.decimal,
          d7: numberToValue(Number(collection.floorSale['7day']), currencyInfo).amount,
          d7Change: numberToValue(Number(collection.floorSaleChange['7day']), currencyInfo).amount.decimal,
          d30: numberToValue(Number(collection.floorSale['30day']), currencyInfo).amount,
          d30Change: numberToValue(Number(collection.floorSaleChange['30day']), currencyInfo).amount.decimal,
          // y1: Amount;
          // y1Change: Decimal;
        },
        volume: {
          h24: numberToValue(Number(collection.volume['1day']), currencyInfo).amount,
          h24Change: numberToValue(Number(collection.volumeChange['1day']), currencyInfo).amount.decimal,
          d7: numberToValue(Number(collection.volume['7day']), currencyInfo).amount,
          d7Change: numberToValue(Number(collection.volumeChange['7day']), currencyInfo).amount.decimal,
          d30: numberToValue(Number(collection.volume['30day']), currencyInfo).amount,
          d30Change: numberToValue(Number(collection.volumeChange['30day']), currencyInfo).amount.decimal,
          // y1: Amount;
          // y1Change: Decimal;
        },
      }
    }

    return metadata;
  }

  getHost(_chain?: Chain): string {
    switch (_chain) {
      case undefined:
      case Chain.ETHEREUM:
        return this.getApiHost();
      case Chain.POLYGON:
        return 'https://api-polygon.reservoir.tools/';
      case Chain.BSC:
        return 'https://api-bsc.reservoir.tools/';
      case Chain.ARBITRUM:
        return 'https://api-arbitrum.reservoir.tools/';
      case Chain.OPTIMISM:
        return 'https://api-optimism.reservoir.tools/';
      default:
        throw new Error(`${_chain} is not supported by ${this.getName()}.`);
    }
  }

  getName(): string {
    return 'Reservoir';
  }
}
