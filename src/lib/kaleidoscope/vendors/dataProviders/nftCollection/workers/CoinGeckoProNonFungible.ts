import { Chain, Timeframe } from '../../../../../enums';
import { ContractPointer, NFTCollectionMetadata, Value } from '../../../../../types';
import { RestfulProvider } from '../../RestfulProvider';
import { NftCollectionDataProvider } from '../NftCollectionDataProvider';
import { numberToValue } from '../../../../../utils/numberToValue';
import { ticksToIOCHLV } from '../../../../../utils/charts/ticksToIOCHLV';
import { batchCandleJSON, IOHLCV } from 'candlestick-convert';
import { chainToBlockchainExplorerHost } from '../../../../../utils/crossChainSupport';

// Docs: https://www.coingecko.com/en/api/documentation
// Pro Docs: https://apiguide.coingecko.com/exclusive-endpoints/for-paid-plan-subscribers

export class CoinGeckoProNonFungible extends RestfulProvider
  implements NftCollectionDataProvider {
  constructor(_config: any) {
    const apiHost = 'https://pro-api.coingecko.com/api/v3/';
    super(_config, apiHost);
  }

  // {host}/nfts/{asset_platform_id}/contract/{contract_address}/market_chart
  async getFloorChart(
    _contract: ContractPointer,
    _timeframe?: Timeframe
  ): Promise<any> {
    const [ _days, _newTimeframe ] = this._getTimeParams(_timeframe);
    const host = this.getApiHost();
    const chain = this.getBlockchain(_contract.chain);
    const uri = `${host}nfts/${chain}/contract/${_contract.address}/market_chart`;
    const options = {
      searchParams: {
        days: _days,
      },
      headers: {
        Accept: 'application/json',
        'x-cg-pro-api-key': this.getApiKey(),
      },
    };

    // Get the ticks and convert them to candles
    const json: any = await this.gotJson(uri, options);
    let iochlv: IOHLCV[] = ticksToIOCHLV(json.floor_price_native);

    // 5 minutes is the default timeframe for <=14 days of data
    let baseTimeframe: number = 60 * 5;
    if (_days === 'max') {
      // 1d is the default timeframe for >14 days of data
      // We have 1d volume to match to 1d candles
      iochlv = this._injectVolumeIntoIOCHLV(iochlv, json.h24_volume_native); // add volume to 1d candles
      baseTimeframe = 60 * 60 * 24;
    }

    // Convert the candles to the requested timeframe
    iochlv = batchCandleJSON(iochlv, baseTimeframe, _newTimeframe);

    const currencyInfo = this.getCurrencyInfoFromChain(_contract.chain);
    const combinedResponse = {
      currencyInfo: currencyInfo,
      iochlv: iochlv,
      // ticks: json,
    };
    return combinedResponse;
  }

  private _getTimeParams(_timeframe?: Timeframe): [number | string, number] {
    switch (_timeframe) {
      case Timeframe.FIVE_MIN:
        return [14, 60 * 5];
      case Timeframe.FIFTEEN_MIN:
        return [14, 60 * 15];
        case Timeframe.THIRTY_MIN:
          return [14, 60 * 15];
      case Timeframe.ONE_HOUR:
        return [14, 60 * 60];
      case undefined:
      case Timeframe.ONE_DAY:
        return ["max", 60 * 60 * 24];
      case Timeframe.ONE_WEEK:
        return ["max", 60 * 60 * 24 * 7];
      default:
        throw new Error('Invalid timeframe.');
    }
  }

  private _injectVolumeIntoIOCHLV(
    _iochlv: IOHLCV[], 
    _volume: [number, number][]
  ): IOHLCV[] {
    // Create a volume map for quick lookup
    const volumeMap = new Map(_volume.map(([time, volume]) => [time, volume]));
  
    // Add volume to the matching IOHLCV data
    return _iochlv.map(ohlcv => {
      const volume = volumeMap.get(ohlcv.time) || 0;
  
      return {
        ...ohlcv,
        volume: volume
      };
    });
  }
  

  // {host}/nfts/{chain}/contract/{contract_address}
  async getFloor(_contract: ContractPointer): Promise<Value> {
    const host = this.getApiHost();
    const chain = this.getBlockchain(_contract.chain);
    const uri = `${host}nfts/${chain}/contract/${_contract.address}`;
    const options = {
      headers: {
        Accept: 'application/json',
        'x-cg-pro-api-key': this.getApiKey(),
      },
    };

    const json: any = await this.gotJson(uri, options);
    const currencyInfo = this.getCurrencyInfoFromChain(_contract.chain);
    return numberToValue(
      Number(json.floor_price.native_currency),
      currencyInfo
    );
  }

  // /nfts/{asset_platform_id}/contract/{contract_address}
  async getMetadata(_contract: ContractPointer): Promise<any> {
    const host = this.getApiHost();
    const chain = this.getBlockchain(_contract.chain);
    const uri = `${host}nfts/${chain}/contract/${_contract.address}`;
    const options = {
      headers: {
        Accept: 'application/json',
        'x-cg-pro-api-key': this.getApiKey(),
      },
    };

    const json: any = await this.gotJson(uri, options);
    
    const currencyInfo = this.getCurrencyInfoFromChain(_contract.chain);
    const metadata: NFTCollectionMetadata = {
      contract: _contract,
      symbol: json.symbol,
      name: json.name,
      description: json.description,
      collectionSize: Number(json.total_supply),
      ownerCount: Number(json.number_of_unique_addresses),
      images: {
        thumbnail: json.image.small,
      },
      urls: {
        explorer: `${chainToBlockchainExplorerHost(_contract.chain)}/address/${
          _contract.address
        }`,
        website: json.links.homepage,
        discord: json.links.discord,
        twitter: json.links.twitter,
      },
      stats: {
        currencyInfo: currencyInfo,
        floor: {
          h24: numberToValue(Number(json.floor_price.native_currency), currencyInfo)
            .amount,
          h24Change: numberToValue(
            Number(json.floor_price_24h_percentage_change.native_currency),
            currencyInfo
          ).amount.decimal,
        },
        volume: {
          h24: numberToValue(Number(json.volume_24h.native_currency), currencyInfo)
            .amount,
          h24Change: numberToValue(
            Number(json.volume_24h_percentage_change.native_currency),
            currencyInfo
          ).amount.decimal,
        },
      },
    };

    return metadata;
  }

  getBlockchain(_chain?: Chain): string {
    switch (_chain) {
      case undefined:
      case Chain.ETHEREUM:
        return 'ethereum';
      case Chain.BSC:
        return 'binance-smart-chain';
      case Chain.POLYGON:
        return 'polygon-pos';
      case Chain.ARBITRUM:
        return 'arbitrum-one';
      case Chain.SOLANA:
        throw new Error(
          'Solana is supported by CoinGecko, but not yet implemented.'
        );
      // return 'solana';
      case Chain.OPTIMISM:
        return 'optimistic-ethereum';
      case Chain.AVALANCHE:
        return 'avalanche';
      case Chain.KLAYTN:
        return 'klay-token';
      default:
        throw new Error(`${_chain} is not supported by ${this.getName()}.`);
    }
  }

  getName(): string {
    return 'CoinGecko Pro';
  }
}
