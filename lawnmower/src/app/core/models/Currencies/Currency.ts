import { CurrencySymbol } from './CurrencySymbol';

export class Currency {
    id: string;
    amount: number = 0;
    type: CurrencySymbol;
    gain?: number = 0;
}
