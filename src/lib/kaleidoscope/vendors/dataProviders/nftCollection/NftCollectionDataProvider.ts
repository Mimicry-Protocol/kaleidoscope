import { Chain } from '../../../../enums';
import { ContractPointer, Value } from '../../../../types';

export abstract class NftCollectionDataProvider {
  abstract getBlockchain(_chain: Chain): string;
  abstract getFloor(_contract: ContractPointer): Promise<Value>;
  abstract getMarketCap(_contract: ContractPointer): Promise<Value>;
  abstract getMetadata(_contract: ContractPointer): Promise<any>;
  abstract getName(): string;
}
