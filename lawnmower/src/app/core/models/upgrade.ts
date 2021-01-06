import { $ } from "protractor";

export type UpgradeType = 'global' | 'mowing';

export class Upgrade {
    name: string;
    price: number;
    type: UpgradeType;
    effect: Function;
    bought: boolean = false;
    currency: string = "$";

    constructor(name: string, price: number, type: UpgradeType, effect: Function) {
        this.name = name;
        this.price = price;
        this.type = type;
        this.effect = effect;
    }
}
