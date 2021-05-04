export type CreationBonus = 'Idea' | 'IdeaLimit' | 'CreationGain' | 'ThinkingLimit' | 'Feature';

export class Creation {
    name: string;
    level: number;
    description: string;
    bonus: CreationBonus;

    /**
     *
     */
    constructor(name: string, description: string, bonus: CreationBonus) {
        this.name = name;
        this.level = 0;
        this.description = description;
        this.bonus = bonus;
    }
    price() {}
}
