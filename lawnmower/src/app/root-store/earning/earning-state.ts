import { Money, Currency } from '@core/models/Currencies';

interface Timer {
    time?: number;
    deltaTime?: number;
}
export interface State {
    currencies: {
        [symbol: string]: Currency;
    };
    timer: Timer;
}

export const initialState: State = {
    currencies: {
        [new Money().id]: new Money(0.0),
    },
    timer: {},
};
