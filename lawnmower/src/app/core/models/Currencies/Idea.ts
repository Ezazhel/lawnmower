import { Currency } from './Currency';
import { CurrencySymbol } from './CurrencySymbol';

export class Idea implements Currency {
    id: string;
    type: CurrencySymbol;
    gain?: number;
    amount: number;
    basePrice: number;
    canPayToGetIdea: boolean;
    constructor() {
        this.amount = 0;
        this.basePrice = 0.5;
        this.id = 'Idea';
        this.type = 'Idea';
    }

    price() {
        return this.basePrice * Math.pow(1.35, this.amount) * Math.floor(Math.max(1, this.amount / 5));
    }

    bonusToImagination() {
        return Math.pow(1.15, this.amount);
    }

    additiveImaginationGain(own: number) {
        return 0.01 * own;
    }

    priceDollar() {
        return (1 + this.basePrice) * Math.pow(1.55, this.amount);
    }
}
