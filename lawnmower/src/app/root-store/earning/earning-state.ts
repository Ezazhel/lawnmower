import { Money } from '@core/models/currency';

export interface State {
    money: Money;
}

export const initialState: State = {
    money: new Money(0.05),
};
