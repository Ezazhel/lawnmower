import { BonusType, IBonusFeature } from './Bonus';

export type CreationBonus = 'IdeaGain' | 'IdeaLimit' | 'CreationGain' | 'ImaginationLimit' | 'Feature';

export class Creation {
    id: string;
    name: string;
    level: number;
    maxLevel: number;
    description: string;
    bonus: CreationBonus;

    bonusType: BonusType;
    price: (creation?: Creation) => number;

    reference?: string;

    constructor(
        id: string,
        name: string,
        description: string,
        maxLevel: number,
        price: (creation?: Creation) => number,
    ) {
        this.id = id;
        this.name = name;
        this.level = 1;
        this.maxLevel = maxLevel;
        this.description = description;
        this.price = price;
        this.reference = this.id;
    }
}
