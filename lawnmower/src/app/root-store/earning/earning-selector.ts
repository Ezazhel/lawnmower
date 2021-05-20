import { IBonusWithLevel } from './../../core/models/Bonus';
import { IBonus } from '@core/models/Bonus';
import { CreationPoint, Currency, CurrencySymbol, Idea, Imagination } from '@core/models/Currencies';
import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { achievementBonusMult } from 'app/root-store/achievements/achievements-selector';
import { selectImaginationBonus } from 'app/root-store/upgrades/upgrades-selector';
import { State } from './earning-state';

const getMoney = (state: State) => state.currencies['$'];

const getCurrency = (state: State, currencyId: string) => state.currencies[currencyId];

export const selectEarningState: MemoizedSelector<object, State> = createFeatureSelector('earning');

export const selectMoney = createSelector(selectEarningState, getMoney);

export const selectAllCurrencies = createSelector(selectEarningState, (state) => {
    return Object.keys(state.currencies).map((currencySymbol) => state.currencies[currencySymbol]);
});

export const selectCurrency = createSelector(
    selectEarningState,
    (state: State) =>
        <C extends Currency>(base: new () => C, symbol: CurrencySymbol): C => {
            const currency = getCurrency(state, symbol);
            if (currency !== undefined) {
                return Object.assign(new base(), currency);
            } else return undefined;
        },
);
export const selectTimer = createSelector(selectEarningState, (state) => state.timer);
export const selectCreationPoint = createSelector(selectCurrency, (func) => func(CreationPoint, 'C'));

export const selectIdea = createSelector(selectCurrency, (func) => func(Idea, 'Idea'));

const imaginationPrivate = createSelector(
    selectTimer,
    selectCurrency,
    selectIdea,
    selectCreationPoint,
    achievementBonusMult,
    (timer, currency, idea, creationPoint, achievementBonus) => {
        const imagination = currency(Imagination, 'I') ?? new Imagination();
        return imagination.setPrivate(idea, creationPoint, null, timer.deltaTime, achievementBonus);
    },
);
export const selectImagination = createSelector(imaginationPrivate, selectImaginationBonus, (imagination, bonus) => {
    const { upgradeBonus, creationsBonus } = bonus;
    imagination.bonus = [...upgradeBonus, ...creationsBonus];
    return imagination;
});
