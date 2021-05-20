import { BonusType, IBonusWithLevel } from '@core/models/Bonus';
import { RootStoreState } from 'app/root-store';
import { CurrencySymbol } from '../Currencies';
import { AffectType } from './AffectType';
import { UpgradeType } from './UpgradeType';
export interface Upgrade {
    id: string;
    name: string;
    type: UpgradeType;
    description: string;
    effectDescription: string;
    affect: AffectType;
    currency: CurrencySymbol;
    bonusType: BonusType;

    level: number;
    maxLevel: number;

    requiredToUnlock?: (state: RootStoreState.State) => boolean;
    price: () => number;
}
