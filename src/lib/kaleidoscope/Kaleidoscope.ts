import { NftCollectionFactory } from './vendors/dataProviders/nftCollection/NftCollectionFactory';
import { FungibleFactory } from './vendors/dataProviders/fungibleToken/FungibleFactory';

export class Kaleidoscope {
  nftCollection?: NftCollectionFactory;
  fungibleToken?: FungibleFactory;

  constructor(_config: any) {
    if (__DEV__) {
      console.log('Kaleidoscope Constructor');
    }

    if (!_config.dataProviders) {
      throw new Error('No data providers specified in config');
    }

    // Setup NFT Collection Data Providers
    if (_config.dataProviders.nonFungibleTokens) {
      this.nftCollection = new NftCollectionFactory(_config);
    }

    // Setup Fungible Token Data Providers
    if (_config.dataProviders.fungibleTokens) {
      this.fungibleToken = new FungibleFactory(_config);
    }
  }
}
