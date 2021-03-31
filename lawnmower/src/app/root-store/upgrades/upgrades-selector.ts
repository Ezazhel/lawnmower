import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './upgrades-state';
import { MowingUpgrade } from '@core/data/upgrade-data';
import { Upgrade } from '@core/models/upgrade';
import { BloggingUpgrade } from '../../core/data/upgrade-data';
import { UpgradeType, UpgradeTabsAffected } from '../../core/models/upgrade';
import { CurrencySymbol } from '../../core/models/currency';

export const selectUpgradeState: MemoizedSelector<object, State> = createFeatureSelector('upgrades');

const reduceEffectMult = (acc: number, current: Upgrade) => acc * current.effect(current.level);
const reduceEffectAdd = (acc: number, current: Upgrade) => acc + current.effect(current.level);

const sortByCompleted = (a: Upgrade, b: Upgrade) => (a.level == a.maxLevel ? 1 : 0) - (b.level == b.maxLevel ? 1 : 0);

//#region  Mowing

const getMowingUpgradeLevelValue = (state: State): Upgrade[] =>
    Object.keys(state.mowing)
        .map((key) => Object.assign(MowingUpgrade[key], { level: state.mowing[key] }) as Upgrade)
        .sort(sortByCompleted);

const getMowingUpgradeLeveledUpOnly = (state: State): Upgrade[] =>
    getMowingUpgradeLevelValue(state).filter((u) => u.level > 0);

const getMowingSpeedUpgradeModifier = (state: State): number =>
    getMowingUpgradeLeveledUpOnly(state)
        .filter((u) => u.affect == 'speed')
        .reduce(reduceEffectMult, 1);

const getMowingRegrowSpeedUpgradeModifier = (state: State): number =>
    getMowingUpgradeLeveledUpOnly(state)
        .filter((u) => u.affect == 'regrow')
        .reduce(reduceEffectMult, 1);

const getMowingCuttingLimit = (state: State): number =>
    getMowingUpgradeLeveledUpOnly(state)
        .filter((u) => u.affect == 'cuttingLimit')
        .reduce(reduceEffectAdd, 0);

export const selectMowingUpgradeLevelValue = createSelector(selectUpgradeState, getMowingUpgradeLevelValue);

export const selectMowingUpgradeLeveledUpOnly = createSelector(selectUpgradeState, getMowingUpgradeLeveledUpOnly);

export const selectMowingSpeedUpgradeModifier = createSelector(selectUpgradeState, getMowingSpeedUpgradeModifier);

export const selectMowingGainModifier = createSelector(selectUpgradeState, (state) => {
    return Object.keys(state.mowing)
        .map((key) => Object.assign(MowingUpgrade[key], { level: state.mowing[key] }) as Upgrade)
        .filter((u) => u.affect == 'gain' && u.level > 0)
        .reduce(reduceEffectMult, 1);
});
export const selectCuttingLimitModifier = createSelector(selectUpgradeState, getMowingCuttingLimit);

export const selectMowingRegrowSpeedUpgradeModifier = createSelector(
    selectUpgradeState,
    getMowingRegrowSpeedUpgradeModifier,
);

//#endregion

//#region Blogging
const getBloggingUpgradeLevelValue = (state: State): Upgrade[] =>
    Object.keys(state.blogging)
        .map((key) => Object.assign(BloggingUpgrade[key], { level: state.blogging[key] }) as Upgrade)
        .sort(sortByCompleted);

export const selectBloggingUpgradeLevelValue = createSelector(selectUpgradeState, getBloggingUpgradeLevelValue);

//#endregion

export const selectSpecificUpgradeCurrency = createSelector(
    selectUpgradeState,
    (state, upgradeType: UpgradeTabsAffected) => {
        switch (upgradeType) {
            case 'mowing':
                return [...new Set(getMowingUpgradeLevelValue(state).map((u) => u.currency))];
            case 'blogging':
                return [...new Set(getBloggingUpgradeLevelValue(state).map((u) => u.currency))];
        }
    },
);

export const selectUpgradeForCurrencyAndTabs = createSelector(
    selectUpgradeState,
    (state, props: { symbol: CurrencySymbol; tabs: UpgradeTabsAffected }) => {
        switch (props.tabs) {
            case 'mowing':
                return getMowingUpgradeLevelValue(state).filter((u) => u.currency == props.symbol);
            case 'blogging':
                return getBloggingUpgradeLevelValue(state).filter((u) => u.currency == props.symbol);
        }
    },
);
