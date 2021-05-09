export interface IBonus {
    effect: Function;
}

export type Bonus = CreationBonus | BookAffect | UpgradeBonus;
type CreationBonus = 'IdeaGain' | 'IdeaLimit' | 'CreationGain' | 'ImaginationLimit' | 'Feature';
type BookAffect = 'creationGain' | 'readingSpeed' | 'ideaGain' | 'feature' | 'ideaLimit';
type UpgradeBonus = 'speed' | 'gain' | 'regrow' | 'cuttingLimit' | 'feature' | 'creation' | 'imaginationGain';
