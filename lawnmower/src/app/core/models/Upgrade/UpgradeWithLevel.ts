import { RootStoreState } from 'app/root-store/';
import { max } from 'rxjs/operators';
import { UpgradeType, AffectType } from '.';
import { BonusType, IBonusWithLevel } from '../Bonus';
import { CurrencySymbol } from '../Currencies';
import { Upgrade } from './Upgrade';

export class UpgradeBonusByLevel implements Upgrade, IBonusWithLevel {
    level: number;
    maxLevel: number;

    effect: () => number;

    price: () => number;
    requiredToUnlock?: (state: RootStoreState.State) => boolean;
    constructor(
        public id: string,
        public name: string,
        public type: UpgradeType,
        public description: string,
        public effectDescription: string,
        public affect: AffectType,
        public bonusType: BonusType,
        public currency: CurrencySymbol,
        maxLevel: number,

        effect: () => number,
        price: () => { base: number; pow?: number },
        requiredToUnlock?: (state: RootStoreState.State) => boolean,
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.price = function () {
            const { base, pow } = price();
            if (!pow) return base * Math.max(1, this.level);
            return base * Math.pow(pow, Math.max(1, this.level));
        };
        this.effect = function () {
            return Math.pow(effect(), this.level);
        };
        this.requiredToUnlock = requiredToUnlock;
        this.level = 0;
        this.maxLevel = maxLevel;
    }
}
