import { Money, Currency } from '@core/models/Currencies';

export interface State {
    currencies: {
        [symbol: string]: Currency;
    };
}

export const initialState: State = {
    currencies: {
        [new Money().id]: new Money(0.0),
    },
};
