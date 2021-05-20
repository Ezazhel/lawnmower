import { RootStoreState } from 'app/root-store/';
import { BonusType } from '../Bonus';
import { CurrencySymbol } from '../Currencies';
import { AffectType } from './AffectType';
import { UpgradeType } from './UpgradeType';
import { UpgradeBonusByLevel } from './UpgradeWithLevel';

export class UpgradeOneTimeBuy extends UpgradeBonusByLevel {
    effect: () => number;
    reference?: string;
    requiredToUnlock?: (state: RootStoreState.State) => boolean;
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

        price: () => number,
        effect: () => { base: number; pow?: number },
        requiredToUnlock?: (state: RootStoreState.State) => boolean,
    ) {
        super(
            id,
            name,
            type,
            description,
            effectDescription,
            affect,
            bonusType,
            currency,
            1,
            price,
            effect,
            requiredToUnlock,
        );
    }
}
