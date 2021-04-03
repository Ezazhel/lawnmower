import { Money, Currency, Imagination } from '@core/models/currency';

export interface State {
    currencies: {
        [symbol: string]: Currency;
    };
}

export const initialState: State = {
    currencies: {
        [new Money().id]: new Money(0.05),
    },
};
