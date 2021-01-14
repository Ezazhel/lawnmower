import { createReducer, on } from '@ngrx/store';
import { initialState } from './stats-state';
import { incrementTotalMoney, incrementTotalMowned } from './stats-action';

export const reducer = createReducer(
  initialState,
  on(incrementTotalMoney, (state, { money }) => ({
    ...state,
    totalMoney: state.totalMoney + money,
  })),
  on(incrementTotalMowned, (state, { mowned} ) => ({...state, totalMowned: state.totalMowned + mowned}))
);
