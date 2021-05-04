import { Currency } from './Currency';
import { CurrencySymbol } from './CurrencySymbol';

export class Money implements Currency {
    id: string;
    amount: number;
    type: CurrencySymbol;
    gain?: number;
    constructor(amount?: number) {
        this.id = '$';
        this.amount = amount ?? 0;
        this.type = '$';
    }
}
