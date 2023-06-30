import { Chain } from '../../../../enums';
import { ContractPointer, ThrottleConfig } from '../../../../types';

export abstract class FungibleDataProvider {
  abstract getPrice(_contracts: ContractPointer): Promise<bigint>;
  abstract getBlockchain(_chain: Chain): string;
  abstract getThrottleConfig(): ThrottleConfig;
}
