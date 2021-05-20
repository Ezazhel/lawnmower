import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { achievementBonusMult, achievements } from 'app/root-store/achievements/achievements-selector';
import { RootStoreState } from 'app/root-store/';

@Injectable({ providedIn: 'root' })
export class AchievementFacadeService {
    achievements$ = this.store.select(achievements);

    achievementBonusToCurrency$ = this.store.select(achievementBonusMult);

    constructor(private store: Store<RootStoreState.State>) {}
}
