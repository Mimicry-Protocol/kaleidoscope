import { Chain } from '../../../../enums';
import { ContractPointer, Value } from '../../../../types';

export abstract class FungibleDataProvider {
  abstract getBlockchain(_chain: Chain): string;
  abstract getPrice(_contracts: ContractPointer): Promise<Value>;
  abstract getName(): string;
}
