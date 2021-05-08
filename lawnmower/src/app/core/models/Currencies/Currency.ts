import { CurrencySymbol } from './CurrencySymbol';

export interface Currency {
    id: string;
    amount: number;
    type: CurrencySymbol;
    gain?: number;

    limit?: number;
}
