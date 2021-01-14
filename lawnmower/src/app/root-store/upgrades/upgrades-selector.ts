import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './upgrades-state';
import { MowingUpgrade } from '@core/data/upgrade-data';
import { Upgrade } from '@core/models/upgrade';

const getMowingUpgradeBoughtValue = (state: State): Upgrade[] =>
    Object.keys(state.mowing).map((key) => Object.assign(MowingUpgrade[key], { bought: state.mowing[key] }) as Upgrade);

const getMowingUpgradeBoughtOnly = (state: State): Upgrade[] =>
    getMowingUpgradeBoughtValue(state).filter((u) => u.bought);

const getMowingSpeedUpgradeModifier = (state: State): number =>
    getMowingUpgradeBoughtOnly(state)
        .filter((u) => u.affect == 'speed')
        .reduce((acc, current) => acc * current.effect(), 1);
const getMowingRegrowSpeedUpgradeModifier = (state: State): number =>
    getMowingUpgradeBoughtOnly(state)
        .filter((u) => u.affect == 'regrow')
        .reduce((acc, current) => acc * current.effect(), 1);

const getMowingCuttingLimit = (state: State): number =>
    getMowingUpgradeBoughtOnly(state)
        .filter((u) => (u.affect = 'cuttingLimit'))
        .reduce((acc, current) => acc + current.effect(), 0);

export const selectUpgradeState: MemoizedSelector<object, State> = createFeatureSelector('upgrades');

export const selectMowingUpgradeBoughtValue = createSelector(selectUpgradeState, getMowingUpgradeBoughtValue);

export const selectMowingUpgradeBoughtOnly = createSelector(selectUpgradeState, getMowingUpgradeBoughtOnly);

export const selectMowingSpeedUpgradeModifier = createSelector(selectUpgradeState, getMowingSpeedUpgradeModifier);

export const selectMowingGainModifier = createSelector(selectUpgradeState, (state) => {
    return Object.keys(state.mowing)
        .map((key) => Object.assign(MowingUpgrade[key], { bought: state.mowing[key] }) as Upgrade)
        .filter((u) => u.affect == 'gain' && u.bought)
        .reduce((acc, current) => acc * current.effect(), 1);
});

export const selectCuttingLimitModifier = createSelector(selectUpgradeState, getMowingCuttingLimit);

export const selectMowingRegrowSpeedUpgradeModifier = createSelector(
    selectUpgradeState,
    getMowingRegrowSpeedUpgradeModifier,
);
