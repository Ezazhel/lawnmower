import { Currency } from './Currency';
import { CurrencySymbol } from './CurrencySymbol';

export class CreationPoint implements Currency {
    id: string;
    amount: number;
    type: CurrencySymbol;
    gain?: number;
    basePrice: number;
    baseChance: number;
    constructor() {
        this.id = 'C';
        this.type = 'C';
        this.basePrice = 1;
        this.baseChance = 15;
        this.amount = 0;
    }

    price() {
        return Math.floor(this.basePrice * Math.pow(1.45, this.amount));
    }
}
