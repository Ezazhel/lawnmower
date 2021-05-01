export type CreationBonus = 'Idea' | 'IdeaLimit' | 'CreationGain' | 'ThinkingLimit' | 'Feature';

export class Creation {
    name: string;
    level: number;
    description: string;
    bonus: CreationBonus;
    price() {}
}
