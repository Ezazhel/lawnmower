import { AffectType } from '@core/models/Upgrade';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './upgrades-state';
import { MowingUpgrade } from '@core/data/upgrade-data';
import { Upgrade } from '@core/models/Upgrade/Upgrade';
import { BloggingUpgrade } from '@core/data/upgrade-data';
import { UpgradeTabsAffected } from '@core/models/Upgrade';
import { CurrencySymbol } from '@core/models/Currencies';
import { automateIdea } from '@root-store/blogging/blogging-action';

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
        .map((key) => {
            let obj = Object.assign(BloggingUpgrade[key], { level: state.blogging[key] });
            return obj;
        })
        .sort(sortByCompleted);

export const selectBloggingUpgradeLevelValue = createSelector(selectUpgradeState, getBloggingUpgradeLevelValue);

//#endregion

export const selectSpecificUpgradeCurrency = createSelector(
    selectUpgradeState,
    (state, upgradeType: UpgradeTabsAffected) => {
        if (upgradeType == 'mowing') {
            const mowingUpgrade = getMowingUpgradeLevelValue(state).map((u) => u.currency);
            return [...new Set(mowingUpgrade)];
        } else {
            const blogginUpgrade = getBloggingUpgradeLevelValue(state).map((u) => u.currency);
            return [...new Set(blogginUpgrade)];
        }
    },
);

export const selectUpgradeForCurrencyAndTabs = createSelector(
    selectUpgradeState,
    (state, props: { symbol: CurrencySymbol; tabs: UpgradeTabsAffected }) => {
        if (props.tabs == 'mowing') {
            return getMowingUpgradeLevelValue(state).filter((u) => u.currency == props.symbol);
        } else {
            return getBloggingUpgradeLevelValue(state).filter((u) => u.currency == props.symbol);
        }
    },
);

export const selectAllUpgrades = createSelector(selectUpgradeState, (state) => ({
    ...state.blogging,
    ...state.global,
    ...state.mowing,
}));

export const selectUpgradeAffect = createSelector(
    selectAllUpgrades,
    (upgrades: { [id: string]: number }, affect: AffectType) => {
        const filterByUnlocked = (u: Upgrade) => u.affect === affect && upgrades[u.id] !== 0;
        return Object.values({ ...BloggingUpgrade, ...MowingUpgrade }).filter(filterByUnlocked);
    },
);
