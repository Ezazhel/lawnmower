import { RootStoreState } from 'app/root-store';
import { CurrencySymbol } from '../Currencies';
import { AffectType } from './AffectType';
import { UpgradeType } from './UpgradeType';
export class Upgrade {
    id: string;
    name: string;
    price: (level?: number) => number;
    type: UpgradeType;
    effect: Function;
    description: string;
    effectDescription: string;
    affect: AffectType;
    currency: CurrencySymbol = '$';
    level: number = 0;
    maxLevel: number;
    requiredToUnlock?: (state: RootStoreState.State) => boolean;

    constructor(
        id: string,
        name: string,
        price: (level: number) => number,
        type: UpgradeType,
        description: string,
        level: number,
        maxLevel: number,
        effectDescription: string,
        affectType: AffectType,
        effect: Function,
        currency?: CurrencySymbol,
        requiredToUnlock?: (state: RootStoreState.State) => boolean,
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.type = type;
        this.description = description;
        this.level = level;
        this.maxLevel = maxLevel;
        this.effectDescription = effectDescription;
        this.affect = affectType;
        this.effect = effect;
        this.currency = currency ?? '$';
        this.requiredToUnlock = requiredToUnlock;
    }
}
