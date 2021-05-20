import { CreationBonus } from '../creation';
import { BonusType, IBonusWithLevel } from './../Bonus';
export class CreationUpgrade implements IBonusWithLevel {
    public effect: () => number;
    public level: number;

    constructor(
        public id: string,
        public bonusType: BonusType,
        public bonus: CreationBonus,
        public maxLevel: number,
        effect: (level: number) => number,
    ) {
        this.level = 0;
        this.effect = function () {
            return effect(this.level);
        };
    }
}
