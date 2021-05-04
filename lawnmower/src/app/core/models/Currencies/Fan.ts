import { Currency } from './Currency';
import { CurrencySymbol } from './CurrencySymbol';

export class Fan implements Currency {
    id: string;
    amount: number;
    type: CurrencySymbol;
    gain?: number;
    gainChance: number = 0;
}
