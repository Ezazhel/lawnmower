import { AchievementsState } from './achievements';
import { BloggingState } from './blogging';
import { EarningState } from './earning';
import { NeighboorState } from './neighboor';
import { RouteState } from './route';
import { StatsState } from './stats';
import { UpgradeState } from './upgrades';
export interface State {
    stats: StatsState.State;
    neighboor: NeighboorState.State;
    blogging: BloggingState.State;
    earning: EarningState.State;
    upgrades: UpgradeState.State;
    achievements: AchievementsState.State;
    routes: RouteState.State;
}
