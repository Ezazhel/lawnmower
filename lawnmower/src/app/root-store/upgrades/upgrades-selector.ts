import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './upgrades-state';
import { MowingUpgrade } from '@core/data/upgrade-data';
import { Upgrade } from '@core/models/upgrade';

const getMowingUpgradeCompletion = (state: State): Upgrade[] =>
    Object.keys(state.mowing).map((key) => Object.assign(MowingUpgrade[key], { bought: state.mowing[key] }) as Upgrade);

export const selectUpgradeState: MemoizedSelector<object, State> = createFeatureSelector('upgrades');

export const selectMowingUpgradeCompletion = createSelector(selectUpgradeState, getMowingUpgradeCompletion);
