export type AchievementType = 'goal' | 'bonus' | 'feature';

export class Achievement {
    id: string;
    name: string;
    description: string;
    isUnlock: boolean;
    giveBonus: boolean;
    effect: Function;
    canUnlock: Function;
    type: AchievementType;

    constructor(
        id: string,
        name: string,
        description: string,
        type: AchievementType,
        canUnlock: Function,
        effect: Function,
        giveBonus?: boolean,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.effect = effect;
        this.canUnlock = canUnlock;
        this.giveBonus = giveBonus ?? false;
    }
}
