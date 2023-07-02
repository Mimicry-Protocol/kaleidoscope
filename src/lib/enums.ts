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
