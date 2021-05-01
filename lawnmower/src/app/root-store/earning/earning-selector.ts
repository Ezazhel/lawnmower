import { CreationPoint, Currency, CurrencySymbol, Idea, Imagination } from '@core/models/Currencies';
import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
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
    (state: State) => <C extends Currency>(base: new () => C, symbol: CurrencySymbol): C => {
        const currency = getCurrency(state, symbol);
        if (currency !== undefined) {
            return Object.assign(new base(), currency);
        } else return undefined;
    },
);

export const selectImagination = createSelector(selectCurrency, (func) => func(Imagination, 'I'));

export const selectCreation = createSelector(selectCurrency, (func) => func(CreationPoint, 'C'));

export const selectIdea = createSelector(selectCurrency, (func) => func(Idea, 'Idea'));
