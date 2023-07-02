import { Decimal } from 'decimal.js';
import {
  Chain,
  ConsensusFilter,
  ConsensusMethod,
  CurrencySymbol,
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
};

export type CurrencyInfo = {
  symbol: CurrencySymbol;
  name: string;
  decimals: number;
};

export type ContractPointer = {
  chain?: Chain;
  address: string;
};

export type DataProviders = {
  [key: string]: any;
}

// export type ThrottleConfig = {
//   limit: number; // number of requests allowed per interval
//   interval: number; // in milliseconds
// };

export type Value = {
  currencyInfo: CurrencyInfo;
  amount: Amount;
};

export type NFTCollectionMetadata = {
  contract: ContractPointer;
  name: string;
  description: string;
  collectionSize: number;
  ownerCount: number;
  onSaleCount: number;
  //
  createdAt?: string;
  openseaVerificationStatus?: boolean;
  openseaSlug?: string;
  contractType?: string;
  images: {
    thumbnail: string;
    banner?: string;
    samples?: string[];
  }
  urls: { 
    explorer: string;
    website?: string;
    discord?: string;
    twitter?: string;
  };
  stats?: {
    currencyInfo?: CurrencyInfo;
    marketCap?: Amount;
    floor?: {
      h24?: Amount;
      h24Change?: Decimal;
      d7?: Amount;
      d7Change?: Decimal;
      d30?: Amount;
      d30Change?: Decimal;
    }
    volume?: {
      h24?: Amount;
      h24Change?: Decimal;
      d7?: Amount;
      d7Change?: Decimal;
      d30?: Amount;
      d30Change?: Decimal;
    }
  }
};
