import { Upgrade } from '../Upgrade';
import { CreationPoint } from './CreationPoint';
import { Currency } from './Currency';
import { Idea } from './Idea';

export class Imagination extends Currency {
    constructor() {
        super();
        this.gain = 0.02;
        this.id = 'I';
        this.type = 'I';
    }

    additiveBonus(idea: Idea, creation: CreationPoint, bonus: Upgrade[]) {
        let addition =
            this.gain +
            (idea?.additiveImaginationGain(idea.amount) ?? 0) +
            0.05 * Math.floor((creation?.amount ?? 0) / 2);
        return bonus.reduce((previous, next) => next.effect(addition), addition);
    }

    multiplicativebonus(deltaTime: number, idea: Idea, achievementBonus: number) {
        return deltaTime * (idea?.bonusToImagination() ?? 1) * achievementBonus;
    }
}
