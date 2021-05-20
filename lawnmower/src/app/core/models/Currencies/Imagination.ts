import { RootStoreState } from 'app/root-store/';
import { IBonusWithLevel } from '../Bonus';
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
    private _bonus: IBonusWithLevel[];
    private delta: number;
    private achievementBonus: number;

    private state: RootStoreState.State;
    constructor() {
        this.gain = 0.02;
        this.id = 'I';
        this.type = 'I';
        this.limit = 5;
    }

    additiveBonus(idea: Idea, creation: CreationPoint) {
        let addition =
            this.gain +
            (idea?.additiveImaginationGain(idea.amount) ?? 0) +
            0.05 * Math.floor((creation?.amount ?? 0) / 2);
        return (
            this._bonus
                .filter((b) => b.bonusType == 'Additive')
                ?.reduce((previous, next) => (addition += next.effect()), addition) ?? addition
        );
    }

    multiplicativebonus(deltaTime: number, idea: Idea, achievementBonus: number) {
        return deltaTime * (idea?.bonusToImagination() ?? 1) * achievementBonus;
    }

    getGain() {
        return (
            this.additiveBonus(this.idea, this.creation) *
            this.multiplicativebonus(this.delta, this.idea, this.achievementBonus)
        );
    }
    getGainBySecond() {
        return this.getGain() * (1000 / 30);
    }
    setPrivate(
        idea: Idea,
        creation: CreationPoint,
        bonus: IBonusWithLevel[],
        delta: number,
        achievementBonus: number,
    ): Imagination {
        this.idea = idea;
        this.creation = creation;
        this._bonus = bonus;
        this.delta = delta;
        this.achievementBonus = achievementBonus;

        return this;
    }

    setDelta(delta: number) {
        this.delta = delta;
    }

    set bonus(value: IBonusWithLevel[]) {
        this._bonus = value;
    }
}
