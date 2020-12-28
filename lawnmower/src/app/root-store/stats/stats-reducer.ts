import { createReducer, on } from '@ngrx/store';
import { initialState } from './stats-state';
import { incrementTotalMoney } from './stats-action';

export const reducer = createReducer(
  initialState,
  on(incrementTotalMoney, (state, { money }) => ({
    ...state,
    totalMoney: state.totalMoney + money,
  }))
);
