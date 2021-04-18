import { CurrencySymbol } from './currency';
export type UpgradeType = 'global' | 'mowing' | 'blogging';
export type AffectType = 'speed' | 'gain' | 'regrow' | 'cuttingLimit' | 'feature' | 'creation';
export type UpgradeTabsAffected = 'mowing' | 'blogging';
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
    }
}
