import { ContractPointer, ThrottleConfig } from '../../../../types';

export abstract class NftCollectionDataProvider {
  abstract getFloor(_contracts: ContractPointer): Promise<bigint>;
  abstract getThrottleConfig(): ThrottleConfig;
}
