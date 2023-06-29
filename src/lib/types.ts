import { Decimal } from 'decimal.js';
import {
  Chain, 
  ConsensusFilter, 
  ConsensusMethod, 
  Currency, 
  Metric,
} from './enums';

export type Amount = {
  atomic: bigint; // e.g. 26476561042796000000000
  decimal: Decimal; // e.g. 26476.561042796
};

export type ApiConfig = {
  key: string;
  host: string;
};

export type ConsensusMechanism = {
  filter: ConsensusFilter;
  method: ConsensusMethod;
}

export type CurrencyInfo = {
  symbol: Currency;
  name: string;
  decimals: bigint;
};

export interface FungibleInfo {
  chain: Chain;
  address: string;
  currency: CurrencyInfo;
  metric: Metric;
}

export interface NftCollectionInfo {
  chain: Chain;
  address: string;
  currency: CurrencyInfo;
  metric: Metric;
}

export type ThrottleConfig = {
  limit: number;    // number of requests allowed per interval
  interval: number; // in milliseconds
}

export type Value = {
    currency: CurrencyInfo;
    amount: Amount;
};