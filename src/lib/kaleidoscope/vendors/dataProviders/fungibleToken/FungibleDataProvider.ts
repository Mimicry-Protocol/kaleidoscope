import { ContractPointer, ThrottleConfig } from '../../../../types';

export abstract class FungibleDataProvider {
  abstract getPrice(_contracts: ContractPointer): Promise<bigint>;
  abstract getThrottleConfig(): ThrottleConfig;
}
