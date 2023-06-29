import { RestfulProvider } from "../../RestfulProvider";
import { FungibleDataProvider } from "../FungibleProvider";

export class DiaFungible extends RestfulProvider implements FungibleDataProvider {
    
    constructor(_apiKey: string) {
        const apiHost = 'https://api.diadata.org/v1/';
        super(_apiKey, apiHost);
    }

    getPrice(): Promise<bigint> {
        throw new Error("Method not implemented: getPrice()");
    }
}
