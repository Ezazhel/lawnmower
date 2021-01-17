import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './upgrades-state';
import { MowingUpgrade } from '@core/data/upgrade-data';
import { Upgrade } from '@core/models/upgrade';

const reduceEffect = (acc: number, current: Upgrade) => acc * current.effect(current.level);

const getMowingUpgradeLevelValue = (state: State): Upgrade[] =>
    Object.keys(state.mowing).map((key) => Object.assign(MowingUpgrade[key], { level: state.mowing[key] }) as Upgrade);

const getMowingUpgradeLeveledUpOnly = (state: State): Upgrade[] =>
    getMowingUpgradeLevelValue(state).filter((u) => u.level > 0);

const getMowingSpeedUpgradeModifier = (state: State): number =>
    getMowingUpgradeLeveledUpOnly(state)
        .filter((u) => u.affect == 'speed')
        .reduce(reduceEffect, 1);

const getMowingRegrowSpeedUpgradeModifier = (state: State): number =>
    getMowingUpgradeLeveledUpOnly(state)
        .filter((u) => u.affect == 'regrow')
        .reduce(reduceEffect, 1);

const getMowingCuttingLimit = (state: State): number =>
    getMowingUpgradeLeveledUpOnly(state)
        .filter((u) => u.affect == 'cuttingLimit')
        .reduce(reduceEffect, 0);

export const selectUpgradeState: MemoizedSelector<object, State> = createFeatureSelector('upgrades');

export const selectMowingUpgradeLevelValue = createSelector(selectUpgradeState, getMowingUpgradeLevelValue);

export const selectMowingUpgradeLeveledUpOnly = createSelector(selectUpgradeState, getMowingUpgradeLeveledUpOnly);

export const selectMowingSpeedUpgradeModifier = createSelector(selectUpgradeState, getMowingSpeedUpgradeModifier);

export const selectMowingGainModifier = createSelector(selectUpgradeState, (state) => {
    return Object.keys(state.mowing)
        .map((key) => Object.assign(MowingUpgrade[key], { level: state.mowing[key] }) as Upgrade)
        .filter((u) => u.affect == 'gain' && u.level > 0)
        .reduce(reduceEffect, 1);
});

export const selectCuttingLimitModifier = createSelector(selectUpgradeState, getMowingCuttingLimit);

export const selectMowingRegrowSpeedUpgradeModifier = createSelector(
    selectUpgradeState,
    getMowingRegrowSpeedUpgradeModifier,
);
