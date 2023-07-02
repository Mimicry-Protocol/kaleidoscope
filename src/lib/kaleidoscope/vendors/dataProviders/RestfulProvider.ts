import got from 'got';
import { Chain, CurrencySymbol } from '../../../enums';
import { ApiConfig, CurrencyInfo, ThrottleConfig } from '../../../types';

export class RestfulProvider {
  private _config: ApiConfig;

  constructor(_providerConfig: any, _apiHost: string) {
    if (__DEV__) {
      console.log(`${this.getName()} Constructor using ${_apiHost}`);
    }

    // Futureproofing for when providers have custom configs
    const apiKey = (typeof _providerConfig === 'string')
      ? _providerConfig
      : _providerConfig.apiKey;

    this._config = {
      key: apiKey,
      host: _apiHost,
    };
  }

  async gotJson(_uri: string, _options?: any): Promise<any> {
    const combinedOptions = {
      ..._options,
      ...{
        retry: {
          limit: 10,
          backoffLimit: 10_000,
          calculateDelay: ({
            attemptCount,
            computedValue, 
            error
          }: any) => {
            if (__DEV__) {
              console.log(`Retrying ${_uri} (${attemptCount} of 10) 
                in ${computedValue / 5 / 1000} seconds 
                due to ${error}`);
            }
            return computedValue / 5;
          }
        }
      }
    };
    const json: any = await got(_uri, combinedOptions).json();
    return json;
  }

  getApiHost(): string {
    return this._config.host;
  }

  getApiKey(): string {
    return this._config.key;
  }

  getBlockchain(_chain: Chain): string {
    throw new Error('Method not implemented: getBlockchain()');
  }

  getCurrencyInfoFromChain(_chain?: Chain): CurrencyInfo {
    switch (_chain) {
      case undefined:
      case Chain.ARBITRUM:
      case Chain.OPTIMISM:
      case Chain.ETHEREUM:
        return this.getCurrencyInfoFromSymbol(CurrencySymbol.ETH);
      case Chain.POLYGON:
        return this.getCurrencyInfoFromSymbol(CurrencySymbol.MATIC);
      case Chain.SOLANA:
        return this.getCurrencyInfoFromSymbol(CurrencySymbol.SOL);
      case Chain.BSC:
          return this.getCurrencyInfoFromSymbol(CurrencySymbol.BNB);
      default:
        throw new Error(`${_chain} is not a valid chain.`);
    }
  }

  getCurrencyInfoFromSymbol(_symbol?: CurrencySymbol): CurrencyInfo {
    switch (_symbol) {
      case undefined:
      case CurrencySymbol.ETH:
        return {
          symbol: CurrencySymbol.ETH,
          name: 'Ethereum',
          decimals: 18,
        };
      case CurrencySymbol.MATIC:
        return {
          symbol: CurrencySymbol.MATIC,
          name: 'Matic',
          decimals: 18,
        };
      case CurrencySymbol.BNB:
        return {
          symbol: CurrencySymbol.BNB,
          name: 'Binance Coin',
          decimals: 18,
        };
      case CurrencySymbol.SOL:
        return {
          symbol: CurrencySymbol.SOL,
          name: 'Solana',
          decimals: 9,
        };
      case CurrencySymbol.USD:
        return {
          symbol: CurrencySymbol.USD,
          name: 'United States Dollar',
          decimals: 8,
        };
      default:
        throw new Error(`${_symbol} is not a valid CurrencySymbol.`);
    }
  }

  getName(): string {
    return this.constructor.name;
  }

  getThrottleConfig(): ThrottleConfig {
    return {
      limit: 5,
      interval: 1000,
    };
  }
}
