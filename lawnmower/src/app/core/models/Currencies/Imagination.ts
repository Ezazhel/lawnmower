import { Upgrade } from '../Upgrade';
import { CreationPoint } from './CreationPoint';
import { Currency } from './Currency';
import { CurrencySymbol } from './CurrencySymbol';
import { Idea } from './Idea';

export class Imagination implements Currency {
    id: string;
    amount: number;
    type: CurrencySymbol;
    gain: number;
    limit: number;
    private idea: Idea;
    private creation: CreationPoint;
    private bonus: Upgrade[];
    private delta: number;
    private achievementBonus: number;
    constructor() {
        this.gain = 0.02;
        this.id = 'I';
        this.type = 'I';
        this.limit = 5;
    }

    additiveBonus(idea: Idea, creation: CreationPoint, bonus: Upgrade[]) {
        let addition =
            this.gain +
            (idea?.additiveImaginationGain(idea.amount) ?? 0) +
            0.05 * Math.floor((creation?.amount ?? 0) / 2);
        return bonus?.reduce((previous, next) => next.effect(addition), addition) ?? addition;
    }

    multiplicativebonus(deltaTime: number, idea: Idea, achievementBonus: number) {
        return deltaTime * (idea?.bonusToImagination() ?? 1) * achievementBonus;
    }

    getGain() {
        return (
            this.additiveBonus(this.idea, this.creation, this.bonus) *
            this.multiplicativebonus(this.delta, this.idea, this.achievementBonus)
        );
    }
    getGainBySecond() {
        return this.getGain() * (1000 / 30);
    }
    setPrivate(
        idea: Idea,
        creation: CreationPoint,
        bonus: Upgrade[],
        delta: number,
        achievementBonus: number,
    ): Imagination {
        this.idea = idea;
        this.creation = creation;
        this.bonus = bonus;
        this.delta = delta;
        this.achievementBonus = achievementBonus;

        return this;
    }

    setDelta(delta: number) {
        this.delta = delta;
    }
}
