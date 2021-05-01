import { Currency } from './Currency';

export class Money extends Currency {
    constructor(amount?: number) {
        super();
        this.id = '$';
        this.amount = amount ?? 0;
        this.type = '$';
    }
}
