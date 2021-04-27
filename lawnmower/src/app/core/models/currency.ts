export type CurrencySymbol = '$' | 'I' | 'C' | 'Idea';
export class Currency {
    id: string;
    amount: number = 0;
    gain?: number = 0;
    type?: CurrencySymbol;
}

export class Fan extends Currency {
    gainChance: number = 0;
}

export class Creation extends Currency {
    basePrice: number = 1;
    baseChance: number = 15;
    constructor() {
        super();
        this.gain = 0.007;
        this.id = 'C';
        this.type = 'C';
        this.basePrice = 1;
    }

    price() {
        return Math.floor(this.basePrice * Math.pow(1.65, this.amount));
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
        this.type = '$';
        this.amount = amount ?? 0;
    }
}
