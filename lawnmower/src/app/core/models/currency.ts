export type CurrencySymbol = '$' | 'I' | 'C' | 'Idea';
export class Currency {
    id: string;
    amount: number = 0;
    gain?: number = 0;
    public type: CurrencySymbol;
}

export class Fan extends Currency {
    gainChance: number = 0;
}

export class Creation extends Currency {
    basePrice: number = 1;
    baseChance: number = 15;
    constructor() {
        super();
        this.id = 'C';
        this.type = 'C';
        this.basePrice = 1;
    }

    price() {
        return Math.floor(this.basePrice * Math.pow(1.45, this.amount));
    }
}
export class Imagination extends Currency {
    constructor() {
        super();
        this.gain = 0.02;
        this.id = 'I';
        this.type = 'I';
    }
}

export class Money extends Currency {
    constructor(amount?: number) {
        super();
        this.id = '$';
        this.amount = amount ?? 0;
        this.type = '$';
    }
}

export class Idea extends Currency {
    amount: number;
    basePrice: number;
    canPayToGetIdea: boolean;
    constructor() {
        super();
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
