import { RootStoreState } from 'app/root-store/';
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

        price: () => number,
        effect: () => { base: number; pow?: number },
        requiredToUnlock?: (state: RootStoreState.State) => boolean,
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.effect = function () {
            const { base, pow } = effect();
            if (!pow) return base * this.level;
        };
        this.price = function () {
            return price() * this.level;
        };
        this.requiredToUnlock = requiredToUnlock;
        this.level = 0;
    }
}
