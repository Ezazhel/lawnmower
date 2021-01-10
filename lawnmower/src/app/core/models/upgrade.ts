import { $ } from 'protractor';

export type UpgradeType = 'global' | 'mowing';

export class Upgrade {
    id: string;
    name: string;
    price: number;
    type: UpgradeType;
    effect: Function;
    bought: boolean = false;
    description: string;
    effectDescription: string;
    currency: string = '$';

    constructor(
        id: string,
        name: string,
        price: number,
        type: UpgradeType,
        description: string,
        effectDescription: string,
        effect: Function,
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.type = type;
        this.description = description;
        this.effectDescription = effectDescription;
        this.effect = effect;
    }
}
