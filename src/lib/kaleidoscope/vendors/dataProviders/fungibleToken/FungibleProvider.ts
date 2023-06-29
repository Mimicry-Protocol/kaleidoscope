import { 
    FungibleInfo,
    ThrottleConfig
} from "../../../../types";

export abstract class FungibleDataProvider  {
    abstract getPrice(_info: FungibleInfo): Promise<bigint>;
    abstract getThrottleConfig(): ThrottleConfig;
}