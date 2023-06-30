import { ConsensusFilter, ConsensusMethod } from '../../../enums';
import { ConsensusMechanism } from '../../../types';
import { none } from '../../../utils/consensusFilters';
import { median, random } from '../../../utils/consensusMethods';

export class RestfulFactory {
  constructor(_providers: any) {
    if (__DEV__) {
      console.log(`${this.getName()} Constructor`);
    }

    if (!_providers) {
      throw new Error('No providers specified.');
    }
  }

  applyConsensusMechanism(
    _data: bigint[],
    _consensusMechanism: ConsensusMechanism = {
      filter: ConsensusFilter.NONE,
      method: ConsensusMethod.MEDIAN,
    }
  ): bigint {
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

  getName(): string {
    return this.constructor.name;
  }

  protected addDataProvider(_providerName: string, _apiKey: string) {
    throw new Error('Method not implemented: addDataProvider()');
  }

  protected initProviders(_providers: any) {
    for (const [_providerName, _apiKey] of Object.entries(_providers)) {
      this.addDataProvider(_providerName, String(_apiKey));
    }
  }

  private _applyConsensusFilter(
    _data: bigint[],
    _consensusFilter: ConsensusFilter = ConsensusFilter.NONE
  ): bigint[] {
    switch (_consensusFilter) {
      case ConsensusFilter.NONE:
        return none(_data);
      default:
        throw new Error(`${_consensusFilter} is not a valid consensus filter.`);
    }
  }

  private _applyConsensusMethod(
    _data: bigint[],
    _consensusMethod: ConsensusMethod = ConsensusMethod.MEDIAN
  ): bigint {
    switch (_consensusMethod) {
      case ConsensusMethod.MEDIAN:
        return median(_data);
      case ConsensusMethod.RANDOM:
        return random(_data);
      default:
        throw new Error(`${_consensusMethod} is not a valid consensus method.`);
    }
  }
}
