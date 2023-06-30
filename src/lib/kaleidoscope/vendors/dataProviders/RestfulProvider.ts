import { Chain } from '../../../enums';
import { ApiConfig, ThrottleConfig } from '../../../types';

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
