import { Chain, ConsensusFilter, ConsensusMethod } from '../../../enums';
import { ConsensusMechanism, ContractPointer, Value } from '../../../types';
import { none, mad } from '../../../utils/consensusFilters';
import { median, random } from '../../../utils/consensusMethods';

export class RestfulFactory {
  private _verbose: boolean = false;

  constructor(_globalConfig: any) {
    if (__DEV__) {
      console.log(`${this.getName()} Constructor`);
    }

    if (_globalConfig.verbose) {
      this._verbose = _globalConfig.verbose;
    }

    if (!_globalConfig.dataProviders) {
      throw new Error('No providers specified.');
    }
  }

  getName(): string {
    return this.constructor.name;
  }

  async runFactory(
    _dataProviders: any,
    _method: string,
    _contract: ContractPointer,
    _verbose?: boolean,
    _consensusMechanism?: ConsensusMechanism,
  ): Promise<any> {
    const values: Value[] = [];
    const sources: any[] = [];

    for (const _provider of _dataProviders) {
      try {
        const value: Value = await _provider[_method](_contract);
        values.push(value);

        sources.push({
          source: _provider.getName(),
          value: value.amount,
        });
      } catch (error) {
        // Skips Providers with methods not implemented.
        // Skips Providers who's apis are down, throttled, or returning invalid data.
        if (__DEV__) {
          console.error(error);
        }
      }
    }

    const finalValue = this.applyConsensusMechanism(values, _consensusMechanism);
    
    const verboseOutput = {
      method: _method,
      timestamp: new Date().toISOString(),
      currencyInfo: finalValue.currencyInfo,
      value: finalValue.amount,
      sources: sources,
    };
    
    return (this._verbose) ? verboseOutput : finalValue;
  }

  protected addDataProvider(_providerName: string, _apiKey: string) {
    throw new Error('Method not implemented: addDataProvider()');
  }

  protected applyConsensusMechanism(
    _data: Value[],
    _consensusMechanism: ConsensusMechanism = {
      filter: ConsensusFilter.NONE,
      method: ConsensusMethod.MEDIAN,
    }
  ): Value {
    const _filteredData = this._applyConsensusFilter(
      _data,
      _consensusMechanism.filter
    );

    const _consensusValue = this._applyConsensusMethod(
      _filteredData,
      _consensusMechanism.method
    );
    return _consensusValue;
  }

  protected getBlockchain(_chain: Chain): string {
    throw new Error('Method not implemented: addDataProvider()');
  }

  protected initProviders(_providers: any) {
    for (const [_providerName, _apiKey] of Object.entries(_providers)) {
      this.addDataProvider(_providerName, String(_apiKey));
    }
  }

  private _applyConsensusFilter(
    _data: Value[],
    _consensusFilter?: ConsensusFilter
  ): Value[] {
    switch (_consensusFilter) {
      case undefined:
      case ConsensusFilter.NONE:
        return none(_data);
      case ConsensusFilter.MAD:
        return mad(_data);
      default:
        throw new Error(`${_consensusFilter} is not a valid consensus filter.`);
    }
  }

  private _applyConsensusMethod(
    _data: Value[],
    _consensusMethod?: ConsensusMethod
  ): Value {
    switch (_consensusMethod) {
      case undefined:
      case ConsensusMethod.MEDIAN:
        return median(_data);
      case ConsensusMethod.RANDOM:
        return random(_data);
      default:
        throw new Error(`${_consensusMethod} is not a valid consensus method.`);
    }
  }
}
