import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { State } from './earning-state';

const getMoney = (state: State) => state.money;

export const selectEarningState: MemoizedSelector<object, State> = createFeatureSelector('earning');

export const selectMoney = createSelector(selectEarningState, getMoney);
