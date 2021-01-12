export class Achievement {
    id: string;
    name: string;
    description: string;
    isUnlock: boolean;
    giveBonus: boolean;
    effect: Function;
    canUnlock: Function;

    constructor(
        id: string,
        name: string,
        description: string,
        canUnlock: Function,
        effect: Function,
        giveBonus?: boolean,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.effect = effect;
        this.canUnlock = canUnlock;
        this.giveBonus = giveBonus ?? false;
    }
}
