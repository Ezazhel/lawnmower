import { Currency } from './Currency';

export class CreationPoint extends Currency {
    basePrice: number;
    baseChance: number;
    constructor() {
        super();
        this.id = 'C';
        this.type = 'C';
        this.basePrice = 1;
        this.baseChance = 15;
    }

    price() {
        return Math.floor(this.basePrice * Math.pow(1.45, this.amount));
    }
}
