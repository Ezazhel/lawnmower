export type CurrencySymbol = '$' | 'I' | 'C';
export class Currency {
    amount: number = 0;
    gain: number = 0;
}

export class Fan extends Currency {
    gainChance: number = 0;
}

export class Creativity extends Currency {}
export class Imagination extends Currency {}
