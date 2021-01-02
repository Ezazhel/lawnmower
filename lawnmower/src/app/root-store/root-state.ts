import { EarningState } from './earning';
import { NeighboorState } from './neighboor';
import { StatsState } from './stats';
export interface State {
    stats: StatsState.State;
    neighboor: NeighboorState.State;
    earning: EarningState.State;
}
