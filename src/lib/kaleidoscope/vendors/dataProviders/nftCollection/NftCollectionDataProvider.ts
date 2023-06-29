import { NftCollectionInfo, ThrottleConfig } from '../../../../types';

export abstract class NftCollectionDataProvider {
  abstract getFloor(_info: NftCollectionInfo): Promise<bigint>;
  abstract getThrottleConfig(): ThrottleConfig;
}
