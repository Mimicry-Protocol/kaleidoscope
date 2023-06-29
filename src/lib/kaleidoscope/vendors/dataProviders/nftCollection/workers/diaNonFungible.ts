import { RestfulProvider } from "../../RestfulProvider";
import { NftCollectionDataProvider } from "../NftCollectionDataProvider";

export class DiaNonFungible extends RestfulProvider implements NftCollectionDataProvider {
    
    constructor(_apiKey: string) {
        const apiHost = 'https://api.diadata.org/v1/';
        super(_apiKey, apiHost);
    }

    getFloor(): Promise<bigint> {
        throw new Error("Method not implemented: getFloor()");
    }
}