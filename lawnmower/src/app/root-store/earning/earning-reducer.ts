import { createReducer, on } from '@ngrx/store';
import { initialState } from './earning-state';
import { earnMoney } from './earning-action';

export const reducer = createReducer(
  initialState,
  on(earnMoney, (state, { money }) => ({
    ...state,
    money: state.money + money,
  }))
);
