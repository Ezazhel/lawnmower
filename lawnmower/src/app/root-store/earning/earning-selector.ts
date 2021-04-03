import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { State } from './earning-state';

const getMoney = (state: State) => state.currencies['$'];

const getCurrency = (state: State, currencyId: string) => state.currencies[currencyId];

export const selectEarningState: MemoizedSelector<object, State> = createFeatureSelector('earning');

export const selectMoney = createSelector(selectEarningState, getMoney);

export const selectAllCurrencies = createSelector(selectEarningState, (state) => {
    return Object.keys(state.currencies).map((currencySymbol) => state.currencies[currencySymbol]);
});

export const selectImagination = createSelector(selectEarningState, (state) => getCurrency(state, 'I'));
export const selectCreativity = createSelector(selectEarningState, (state) => getCurrency(state, 'C'));
