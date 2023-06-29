import { 
    ApiConfig,
    ThrottleConfig
} from "../../../types";

export class RestfulProvider {
    protected _config: ApiConfig;

    constructor(_apiKey: string, _apiHost: string) {
        if(__DEV__) {
            console.log(`${this.constructor.name} Constructor using ${_apiHost}`);
        }

        this._config = {
            key: _apiKey,
            host: _apiHost
        }
    }

    getThrottleConfig(): ThrottleConfig {
        return {
            limit: 5,
            interval: 1000
        }
    }

    getName(): string {
        return this.constructor.name;
    }
}