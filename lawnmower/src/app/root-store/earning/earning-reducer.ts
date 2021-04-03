import { createReducer, on } from '@ngrx/store';
import { initialState } from './earning-state';
import { earnCurrency } from './earning-action';

export const reducer = createReducer(
    initialState,
    on(earnCurrency, (state, { currency }) => ({
        ...state,
        currencies: {
            ...state.currencies,
            [currency.id]: {
                ...currency,
                ...state.currencies[currency.id],
                amount: (state.currencies[currency.id]?.amount ?? 0) + currency.amount,
            },
        },
    })),
);
