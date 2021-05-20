import { IBonusFeature } from './../Bonus';
import { State } from 'app/root-store/root-state';
import { BonusType } from '../Bonus';
import { CurrencySymbol } from '../Currencies';
import { AffectType } from './AffectType';
import { UpgradeType } from './UpgradeType';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store/';
import { UpgradeOneTimeBuy } from './UpgradeOneTimeBuy';
import { NotifierService } from '@core/services/notifier.service';

export class UpgradeFeature implements Omit<UpgradeOneTimeBuy, 'effect'>, IBonusFeature {
    reference?: string;
    level: number;
    maxLevel: number;
    constructor(
        public id: string,
        public name: string,
        public type: UpgradeType,
        public description: string,
        public effectDescription: string,
        public affect: AffectType,
        public bonusType: BonusType,
        public currency: CurrencySymbol,
        public price: () => number,
        public effect: (store: Store<State>, notifier?: NotifierService) => void,
        public requiredToUnlock?: (state: RootStoreState.State) => boolean,
    ) {
        this.level = 0;
        this.maxLevel = 1;
    }
}
