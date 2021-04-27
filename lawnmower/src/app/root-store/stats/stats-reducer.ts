import { createReducer, on } from '@ngrx/store';
import { initialState } from './stats-state';
import {
    incrementTotalMoney,
    incrementTotalMowned,
    incrementTotalImagination,
    incrementTotalCreation,
    incrementTotalFailedCreation,
    incrementTotalIdea,
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
    on(incrementTotalCreation, (state, { creation: creativity }) => ({
        ...state,
        totalCreativity: state.totalCreativity + creativity,
    })),
    on(incrementTotalFailedCreation, (state, { number }) => ({
        ...state,
        totalFailedCreation: state.totalFailedCreation + number,
    })),
    on(incrementTotalIdea, (state, { idea: number }) => ({ ...state, totalIdea: state.totalIdea + number })),
);
