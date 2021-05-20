import { NotifierService } from '@core/services/notifier.service';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store/';

export interface IBonus {
    effect: (...args: any[]) => any;
    bonusType: BonusType;
    reference?: string; //id reference upgrade.
}

export interface IBonusBaseOnState extends IBonus {
    effect: (state: RootStoreState.State) => number;
}

export interface IBonusWithLevel extends IBonus {
    effect: () => number;
}

export interface IBonusFeature extends IBonus {
    effect: (store: Store<RootStoreState.State>, notifier?: NotifierService) => void;
}

export type BonusType = 'Additive' | 'Multiplicative' | 'Feature';
export type Bonus = CreationBonus | BookAffect | UpgradeBonus;

type CreationBonus = 'IdeaGain' | 'IdeaLimit' | 'CreationGain' | 'ImaginationLimit' | 'Feature';
type BookAffect = 'creationGain' | 'readingSpeed' | 'ideaGain' | 'feature' | 'ideaLimit';
type UpgradeBonus = 'speed' | 'gain' | 'regrow' | 'cuttingLimit' | 'feature' | 'creation' | 'imaginationGain';
