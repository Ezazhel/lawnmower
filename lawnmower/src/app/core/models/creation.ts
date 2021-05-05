export type CreationBonus = 'Idea' | 'IdeaLimit' | 'CreationGain' | 'ThinkingLimit' | 'Feature';

export class Creation {
    id: string;
    name: string;
    level: number;
    description: string;
    bonus: CreationBonus;
    constructor(id: string, name: string, description: string, bonus: CreationBonus) {
        this.id = id;
        this.name = name;
        this.level = 0;
        this.description = description;
        this.bonus = bonus;
    }
    price() {}
}
