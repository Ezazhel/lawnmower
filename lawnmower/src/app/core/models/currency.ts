export type CurrencySymbol = '$' | 'I' | 'C';
export class Currency {
    id: string;
    amount: number = 0;
    gain?: number = 0;
    type?: CurrencySymbol;
}

export class Fan extends Currency {
    gainChance: number = 0;
}

export class Creativity extends Currency {
    constructor() {
        super();
        this.gain = 0.007;
        this.id = 'C';
        this.type = 'C';
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
