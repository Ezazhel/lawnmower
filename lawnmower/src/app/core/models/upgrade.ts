export type UpgradeType = 'global' | 'mowing';
export type AffectType = 'speed' | 'gain' | 'regrow' | 'cuttingLimit';

export class Upgrade {
    id: string;
    name: string;
    price: number;
    type: UpgradeType;
    effect: Function;
    bought: boolean = false;
    description: string;
    effectDescription: string;
    affect: AffectType;
    currency: string = '$';

    constructor(
        id: string,
        name: string,
        price: number,
        type: UpgradeType,
        description: string,
        effectDescription: string,
        affectType: AffectType,
        effect: Function,
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.type = type;
        this.description = description;
        this.effectDescription = effectDescription;
        this.affect = affectType;
        this.effect = effect;
    }
}
