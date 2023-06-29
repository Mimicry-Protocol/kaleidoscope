import { NftCollectionDataProvider } from "./nftCollection/NftCollectionDataProvider";
import { FungibleDataProvider } from "./fungibleToken/FungibleProvider";
import { DiaFungible } from "./fungibleToken/workers/diaFungible";
import { DiaNonFungible } from "./nftCollection/workers/diaNonFungible";

// @ts-ignore
export class RestfulProviderFactory {
    static createNftCollectionDataProvider(
        _providerName: string, 
        _apiKey: string
    ): NftCollectionDataProvider {
        switch (_providerName) {
            case 'dia':
                return new DiaNonFungible(_apiKey);
            default:
                throw new Error(`Provider ${_providerName} not found`);
        }
    }

    static createFungibleTokenDataProvider(
        _providerName: string, 
        _apiKey: string
    ): FungibleDataProvider {
        switch (_providerName) {
            case 'dia':
                return new DiaFungible(_apiKey);
            default:
                throw new Error(`Provider ${_providerName} not found`);
        }
    }
}