import { createReducer, on } from '@ngrx/store';
import { initialState } from './stats-state';
import {
    incrementTotalMoney,
    incrementTotalMowned,
    incrementTotalImagination,
    incrementTotalCreativity,
} from './stats-action';

export const reducer = createReducer(
    initialState,
    on(incrementTotalMoney, (state, { money }) => ({
        ...state,
        totalMoney: state.totalMoney + money,
    })),
    on(incrementTotalMowned, (state, { mowned }) => ({ ...state, totalMowned: state.totalMowned + mowned })),
    on(incrementTotalImagination, (state, { imagination }) => ({
        ...state,
        totalImagination: state.totalImagination + imagination,
    })),
    on(incrementTotalCreativity, (state, { creativity }) => ({
        ...state,
        totalCreativity: state.totalCreativity + creativity,
    })),
);
