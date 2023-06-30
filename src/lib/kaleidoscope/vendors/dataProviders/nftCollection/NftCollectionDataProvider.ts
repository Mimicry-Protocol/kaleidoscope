import { Chain } from '../../../../enums';
import { ContractPointer, ThrottleConfig, Value } from '../../../../types';

export abstract class NftCollectionDataProvider {
  abstract getFloor(_contracts: ContractPointer): Promise<Value>;
  abstract getBlockchain(_chain: Chain): string;
  abstract getThrottleConfig(): ThrottleConfig;
}
