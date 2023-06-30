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

  // @TODO: Add support for a library with retry logic.
  // const json: any = await ky.get(uri, this.getKyConfig()).json();
  async fetchJson(_uri: string, _params?: any): Promise<any> {
    const response = await fetch(_uri, _params);
    const json: any = await response.json();
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
      case Chain.ETHEREUM:
        return this.getCurrencyInfoFromSymbol(CurrencySymbol.ETH);
      case Chain.POLYGON:
        return this.getCurrencyInfoFromSymbol(CurrencySymbol.MATIC);
      case Chain.SOLANA:
        return this.getCurrencyInfoFromSymbol(CurrencySymbol.SOL);
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

  // getKyConfig(): any {
  //   return {
  //     timeout: 60_000,
  //     retry: {
  //       limit: 10,
  //       backoffLimit: 15_000
  //     }
  //   };
  // }

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
