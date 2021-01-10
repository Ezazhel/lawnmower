import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './upgrades-state';
import { MowingUpgrade } from '@core/data/upgrade-data';
import { Upgrade } from '@core/models/upgrade';

const getMowingUpgradeCompletion = (state: State): Upgrade[] =>
    Object.keys(state.mowing).map((key) => Object.assign(MowingUpgrade[key], { bought: state.mowing[key] }) as Upgrade);

const getMowingUpgradeCompletedOnly = (state: State): Upgrade[] =>
    getMowingUpgradeCompletion(state).filter((u) => u.bought);

const getMowingSpeedUpgradeModifier = (state: State): number =>
    getMowingUpgradeCompletedOnly(state).reduce((acc, current) => acc * current.effect(), 1);
export const selectUpgradeState: MemoizedSelector<object, State> = createFeatureSelector('upgrades');

export const selectMowingUpgradeCompletion = createSelector(selectUpgradeState, getMowingUpgradeCompletion);

export const selectMowingUpgradeCompleted = createSelector(selectUpgradeState, getMowingUpgradeCompletedOnly);
export const selectMowingSpeedUpgradeModifier = createSelector(selectUpgradeState, getMowingSpeedUpgradeModifier);
