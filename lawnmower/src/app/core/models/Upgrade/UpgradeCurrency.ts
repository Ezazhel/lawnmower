import { NumberSymbol } from '@angular/common';
import { UpgradeType, AffectType } from '.';
import { BonusType } from '../Bonus';
import { Currency, CurrencySymbol } from '../Currencies';
import { UpgradeBonusByLevel } from './UpgradeWithLevel';

export class UpgradeCurrency<C extends Currency> implements Omit<UpgradeBonusByLevel, 'effect'> {
    level: number;

    price: () => number;

    constructor(
        public id: string,
        public name: string,
        public type: UpgradeType,
        public description: string,
        public effectDescription: string,
        public affect: AffectType,
        public bonusType: BonusType,
        public currency: CurrencySymbol,
        public maxLevel: number,
        public currencyAffected: { new (...args: any[]): C },
        public effect: (currency: C, ...args: any[]) => C,
    ) {
        this.level = 0;
    }
}
