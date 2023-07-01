import { Chain } from '../../../../enums';
import { ContractPointer, ThrottleConfig, Value } from '../../../../types';

export abstract class NftCollectionDataProvider {
  abstract getFloor(_contract: ContractPointer): Promise<Value>;
  abstract getMetadata(_contract: ContractPointer): Promise<any>;
  abstract getBlockchain(_chain: Chain): string;
  abstract getThrottleConfig(): ThrottleConfig;
  abstract getName(): string;
}
