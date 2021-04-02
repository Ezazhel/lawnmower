export type CurrencySymbol = '$' | 'I' | 'C';
export class Currency {
    amount: number = 0;
    gain: number = 0;
    type: CurrencySymbol;
}

export class Fan extends Currency {
    gainChance: number = 0;
}

export class Creativity extends Currency {
    constructor() {
        super();
        this.type = 'C';
    }
}
export class Imagination extends Currency {
    constructor() {
        super();
        this.type = 'I';
    }
}

export class Money extends Currency {
    constructor(amount?: number) {
        super();
        this.type = '$';
        this.amount = amount ?? 0;
    }
}
