import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { State } from './stats-state';

const getTotalMoney = (state: State) => state.totalMoney;

export const selectStatsState: MemoizedSelector<
  object,
  State
> = createFeatureSelector('stats');

export const selectStatsMoney: MemoizedSelector<
  object,
  number
> = createSelector(selectStatsState, getTotalMoney);
