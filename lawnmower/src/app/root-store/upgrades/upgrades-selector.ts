import { AffectType } from '@core/models/Upgrade';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './upgrades-state';
import { MowingUpgrade } from '@core/data/upgrade-data';
import { Upgrade } from '@core/models/Upgrade/Upgrade';
import { BloggingUpgrade } from '@core/data/upgrade-data';
import { CurrencySymbol } from '@core/models/Currencies';
import { selectBooks, selectCreations } from 'app/root-store/blogging/blogging-selector';
import { UpgradeBonusByLevel } from '@core/models/Upgrade/UpgradeWithLevel';

export const selectUpgradeState: MemoizedSelector<object, State> = createFeatureSelector('upgrades');

const reduceEffectMult = (acc: number, current: UpgradeBonusByLevel) => acc * current.effect();
const reduceEffectAdd = (acc: number, current: UpgradeBonusByLevel) => acc + current.effect();

const sortByCompleted = (a: UpgradeBonusByLevel, b: UpgradeBonusByLevel) =>
    (a.level == a.maxLevel ? 1 : 0) - (b.level == b.maxLevel ? 1 : 0);

const getUpgrades = (state: State, upgrade: keyof State) => {
    let upgradeToAssign: { [x: string]: Upgrade & { effect: any } } = {};
    switch (upgrade) {
        case 'blogging':
            upgradeToAssign = BloggingUpgrade;
            break;
        case 'mowing':
            upgradeToAssign = MowingUpgrade;
            break;
    }
    const stateUpgrade = state[upgrade];
    return Object.keys(stateUpgrade)
        .map((key) => {
            let obj = Object.assign({}, upgradeToAssign[key], { level: stateUpgrade[key] });
            return obj;
        })
        .sort(sortByCompleted);
};

//#region  Mowing

const getMowingUpgradeLevelValue = (state: State): UpgradeBonusByLevel[] =>
    Object.keys(state.mowing)
        .map((key) => Object.assign({ ...MowingUpgrade[key] }, { level: state.mowing[key] }))
        .sort(sortByCompleted);

const getMowingUpgradeLeveledUpOnly = (state: State): UpgradeBonusByLevel[] =>
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
        .map((key) => Object.assign(MowingUpgrade[key], { level: state.mowing[key] }))
        .filter((u) => u.affect == 'gain' && u.level > 0)
        .reduce(reduceEffectMult, 1);
});

export const selectCuttingLimitModifier = createSelector(selectUpgradeState, getMowingCuttingLimit);

export const selectMowingRegrowSpeedUpgradeModifier = createSelector(
    selectUpgradeState,
    getMowingRegrowSpeedUpgradeModifier,
);
//#endregion

export const selectSpecificUpgradeCurrency = createSelector(
    selectUpgradeState,
    (state: State, upgradeType: keyof State) => [...new Set(getUpgrades(state, upgradeType).map((u) => u.currency))],
);

export const selectUpgradeForCurrencyAndTabs = createSelector(
    selectUpgradeState,
    (state: State, props: { symbol: CurrencySymbol; tabs: keyof State }) =>
        getUpgrades(state, props.tabs).filter((u) => u.currency == props.symbol),
);

export const selectAllUpgrades = createSelector(selectUpgradeState, (state) => ({
    ...state.blogging,
    ...state.global,
    ...state.mowing,
}));

export const selectAllUpgradesArray = createSelector(selectUpgradeState, (state) => {
    return [...getUpgrades(state, 'mowing'), ...getUpgrades(state, 'blogging')];
});

export const selectUpgradeAffect = createSelector(
    selectAllUpgrades,
    (upgrades: { [id: string]: number }, affect: AffectType) => {
        const filterByUnlocked = (u: Upgrade) => u.affect === affect && upgrades[u.id] !== 0;
        return Object.values({ ...BloggingUpgrade, ...MowingUpgrade }).filter(filterByUnlocked);
    },
);

export const selectImaginationBonus = createSelector(
    selectAllUpgradesArray,
    selectBooks,
    selectCreations,
    (upgrades, books, creations) => {
        const upgradesBoostingImagination = upgrades.filter((upgrade) => upgrade.affect == 'imaginationGain');
        const creationBonus = creations.filter((creation) => creation.bonus == 'ImaginationLimit');

        return { upgradeBonus: upgradesBoostingImagination, creationsBonus: creationBonus };
    },
);
