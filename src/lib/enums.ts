export enum Chain {
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
  SOLANA = 'solana',
  BSC = 'bsc',
  ARBITRUM = 'arbitrum',
  OPTIMISM = 'optimism',
  KLAYTN = 'klaytn',
  AVALANCHE = 'avalanche',
}

export enum CurrencySymbol {
  ETH = 'ETH',
  USD = 'USD',
  MATIC = 'MATIC',
  SOL = 'SOL',
  BNB = 'BNB',
  KLAY = 'KLAY',
  AVAX = 'AVAX',
}

export enum ConsensusFilter {
  MAD = 'mad', // Mean Absolute Deviation
  NONE = 'none',
}

export enum ConsensusMethod {
  MEDIAN = 'median',
  RANDOM = 'random',
  MEAN = 'mean',
}

export enum Timeframe {
  FIVE_MIN = '5m',
  FIFTEEN_MIN = '15m',
  THIRTY_MIN = '30m',
  ONE_HOUR = '1h',
  ONE_DAY = '1d',
  ONE_WEEK = '1w',
}
