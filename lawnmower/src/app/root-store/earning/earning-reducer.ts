import { createReducer, on } from '@ngrx/store';
import { initialState, State } from './earning-state';
import { canPayDollarForIdea, earnCurrency, updateTimer } from './earning-action';
import { Currency } from '@core/models/Currencies';

export const reducer = createReducer(
    initialState,
    on(earnCurrency, (state, { currency }) => earnCurrencyLimited(state, currency)),
    on(canPayDollarForIdea, (state) => ({
        ...state,
        currencies: { ...state.currencies, ['Idea']: { ...state.currencies['Idea'], canPayToGetIdea: true } },
    })),
    on(updateTimer, (state, { timer }) => ({ ...state, timer: timer })),
);

function earnCurrencyLimited(state: State, currency: Currency) {
    let amount: number = (state.currencies[currency.id]?.amount ?? 0) + currency.amount;
    if (currency.limit !== undefined && amount >= currency.limit) {
        amount = currency.limit;
    }
    return {
        ...state,
        currencies: {
            ...state.currencies,
            [currency.id]: {
                ...currency,
                ...state.currencies[currency.id],
                amount,
            },
        },
    };
}
