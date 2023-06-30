import { Chain, CurrencySymbol } from '../../../enums';
import { ApiConfig, CurrencyInfo, ThrottleConfig } from '../../../types';

export class RestfulProvider {
  private _config: ApiConfig;

  constructor(_apiKey: string, _apiHost: string) {
    if (__DEV__) {
      console.log(`${this.getName()} Constructor using ${_apiHost}`);
    }

    this._config = {
      key: _apiKey,
      host: _apiHost,
    };
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

  getCurrencyInfo(_symbol: CurrencySymbol): CurrencyInfo {
    switch (_symbol) {
      case CurrencySymbol.ETH:
        return {
          symbol: CurrencySymbol.ETH,
          name: 'Ethereum',
          decimals: 18,
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

  getKyConfig(): any {
    return {
      timeout: 60_000,
      retry: {
        limit: 10,
        backoffLimit: 15_000
      }
    };
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
