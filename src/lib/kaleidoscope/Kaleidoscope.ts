import { RestfulProvider } from "./vendors/dataProviders/RestfulProvider";
import { RestfulProviderFactory } from "./vendors/dataProviders/RestfulProviderFactory";
import { FungibleDataProvider } from "./vendors/dataProviders/fungibleToken/FungibleProvider";
import { NftCollectionDataProvider } from "./vendors/dataProviders/nftCollection/NftCollectionDataProvider";

export class Kaleidoscope {
    private providers: any[] = [];

    constructor(_config: any) {
        if (__DEV__) {
            console.log('Kaleidoscope Constructor');
        }

        if (!_config.dataProviders) {
            throw new Error('No data providers specified in config');
        }
        if (_config.dataProviders.nfts) {
            this._initNftProviders(_config.dataProviders.nfts);
        }
        if (_config.dataProviders.fungibleTokens) {
            this._initFungibleTokenProviders(_config.dataProviders.fungibleTokens);
        }
    }

    private _initNftProviders(_nftProviders: any) {
        for (const [_providerName, _apiKey] of Object.entries(_nftProviders)) {
            const provider: NftCollectionDataProvider = RestfulProviderFactory.createNftCollectionDataProvider(
                _providerName, 
                String(_apiKey)
            );
            
            this._validateProvider(provider, _providerName);
            this.providers.push(provider);
        }
    }

    private _initFungibleTokenProviders(_fungibleTokenProviders: any) {
        for (const [_providerName, _apiKey] of Object.entries(_fungibleTokenProviders)) {
            const provider: FungibleDataProvider = RestfulProviderFactory.createFungibleTokenDataProvider(
                _providerName, 
                String(_apiKey)
            );
            
            this._validateProvider(provider, _providerName);
            this.providers.push(provider);
        }
    }

    private _validateProvider(_provider: any, _name: string) {
        if (!(_provider instanceof RestfulProvider)) {
            throw new Error(`Provider ${_name} is not a RestfulProvider`);
        }
    }
}
