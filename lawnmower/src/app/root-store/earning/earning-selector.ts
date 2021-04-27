import { Creation, Idea } from '@core/models/currency';
import { assignCurrency } from '@core/utility/utility';
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

export const selectCreation = createSelector(selectEarningState, (state: State) => {
    const currency = getCurrency(state, 'C');
    if (currency != undefined) {
        return assignCurrency(Creation, currency);
    } else return undefined;
});

export const selectIdea = createSelector(selectEarningState, (state: State) => {
    const idea = getCurrency(state, 'Idea');
    if (idea != undefined) {
        return assignCurrency(Idea, idea);
    } else return undefined;
});
