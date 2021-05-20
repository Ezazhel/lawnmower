import { BonusType, IBonusFeature } from './Bonus';

export type CreationBonus = 'IdeaGain' | 'IdeaLimit' | 'CreationGain' | 'ImaginationLimit' | 'Feature';

export class Creation implements IBonusFeature {
    id: string;
    name: string;
    level: number;
    maxLevel: number;
    description: string;
    bonus: CreationBonus;

    bonusType: BonusType;
    price: (creation?: Creation) => number;

    effect: () => number;

    constructor(
        id: string,
        name: string,
        description: string,
        bonus: CreationBonus,
        maxLevel: number,
        price: (creation?: Creation) => number,
        effect: () => number,
    ) {
        this.id = id;
        this.name = name;
        this.level = 1;
        this.maxLevel = maxLevel;
        this.description = description;
        this.bonus = bonus;
        this.price = price;
        this.effect = effect;
    }
}
