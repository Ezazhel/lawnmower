import { selectIdea } from './../../root-store/blogging/blogging-selector';
import { IdlingService } from '@core/services/idling.service';
import { Injectable } from '@angular/core';
import { RootStoreState } from 'app/root-store';
import { Store } from '@ngrx/store';
import { filter, withLatestFrom } from 'rxjs/operators';
import { selectIsThinking } from 'app/root-store/blogging/blogging-selector';
import { selectCreation as selectCreation, selectImagination } from 'app/root-store/earning/earning-selector';
import { earnCurrency } from 'app/root-store/earning/earning-action';
import { Creation, Imagination } from '@core/models/currency';
import {
    incrementTotalCreation as incrementTotalCreation,
    incrementTotalFailedCreation,
    incrementTotalImagination,
} from 'app/root-store/stats/stats-action';
import { Subject } from 'rxjs';
import { useIdea } from '@root-store/blogging/blogging-action';
import { selectAchievementsUnlock } from '@root-store/achievements/achievements-selector';
import { Achievement } from '@core/models/achievement';

@Injectable({
    providedIn: 'root',
})
export class BloggingService {
    doGetCreatePoint: Subject<void> = new Subject();
    constructor(private _store: Store<RootStoreState.State>, private _idlingService: IdlingService) {}

    private thinkSubscription = this._idlingService.timer$
        .pipe(
            withLatestFrom(
                this._store.select(selectIsThinking),
                this._store.select(selectImagination),
                this._store.select(selectIdea),
                this._store.select(selectAchievementsUnlock),
            ),
            filter(([_, isThinking]) => isThinking),
        )
        .subscribe(([timer, _, imagination, idea, achievements]) => {
            imagination ??= new Imagination();
            this._store.dispatch(
                earnCurrency({
                    currency: {
                        ...imagination,
                        amount:
                            (imagination.gain + (idea?.additiveImaginationGain(idea.own) ?? 0)) *
                            timer.deltaTime *
                            (idea?.bonusToImagination() ?? 1) * Achievement.prototype.getBonusAchievement(achievements.length),
                    },
                }),
            );
        });

    private getCreatePointSubscription = this.doGetCreatePoint
        .pipe(
            withLatestFrom(this._store.select(selectIdea), this._store.select(selectCreation), (_, idea, creation) => {
                if ((idea?.own ?? 0) < (creation?.price() ?? Creation.prototype.price())) return;
                if (Math.random() * 100 <= creation.baseChance) {
                    creation.amount += 1;
                    this._store.dispatch(earnCurrency({ currency: { ...creation } }));
                    this._store.dispatch(useIdea());
                } else {
                    this._store.dispatch(useIdea());
                    this._store.dispatch(incrementTotalFailedCreation({ number: 1 }));
                }
            }),
        )
        .subscribe();
}
