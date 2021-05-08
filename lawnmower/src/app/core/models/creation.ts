export type CreationBonus = 'Idea' | 'IdeaLimit' | 'CreationGain' | 'ImaginationLimit' | 'Feature';

export class Creation {
    id: string;
    name: string;
    level: number;
    maxLevel: number;
    description: string;
    bonus: CreationBonus;

    price: (creation?: Creation) => number;

    effect: Function;
    constructor(
        id: string,
        name: string,
        description: string,
        bonus: CreationBonus,
        maxLevel: number,
        price: (creation?: Creation) => number,
        effect: Function,
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
