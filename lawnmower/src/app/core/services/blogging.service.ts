import { selectBlogFeature } from '@root-store/blogging/blogging-selector';
import { selectAchievementBonusMult } from '@root-store/achievements/achievements-selector';
import { selectBookBonus, selectIdea } from '@root-store/blogging/blogging-selector';
import { IdlingService } from '@core/services/idling.service';
import { Injectable } from '@angular/core';
import { RootStoreState } from 'app/root-store';
import { Store } from '@ngrx/store';
import { filter, withLatestFrom } from 'rxjs/operators';
import { selectCreation as selectCreation, selectImagination } from 'app/root-store/earning/earning-selector';
import { earnCurrency } from 'app/root-store/earning/earning-action';
import { Creation, Imagination } from '@core/models/currency';
import { incrementTotalFailedCreation } from 'app/root-store/stats/stats-action';
import { Subject } from 'rxjs';
import { useIdea } from '@root-store/blogging/blogging-action';
import { selectUpgradeAffect } from '@root-store/upgrades/upgrades-selector';

@Injectable({
    providedIn: 'root',
})
export class BloggingService {
    doGetCreatePoint: Subject<void> = new Subject();

    constructor(private _store: Store<RootStoreState.State>, private _idlingService: IdlingService) {}

    private thinkSubscription = this._idlingService.timer$
        .pipe(
            withLatestFrom(
                this._store.select(selectBlogFeature),
                this._store.select(selectImagination),
                this._store.select(selectCreation),
                this._store.select(selectAchievementBonusMult),
            ),
            withLatestFrom(this._store.select(selectUpgradeAffect, 'imaginationGain')),
            filter(([[_, { isThinking }]]) => isThinking),
        )
        .subscribe(([[timer, { idea }, imagination, creation, achievementBonus], imaginationBonus]) => {
            imagination ??= new Imagination();
            let additiveBonus =
                imagination.gain +
                (idea?.additiveImaginationGain(idea.own) ?? 0) +
                0.05 * Math.floor((creation?.amount ?? 0) / 2);
            imaginationBonus.forEach((bonus) => {
                additiveBonus = bonus.effect(additiveBonus);
            });
            const multiplicationBonus = timer.deltaTime * (idea?.bonusToImagination() ?? 1) * achievementBonus;
            this._store.dispatch(
                earnCurrency({
                    currency: {
                        ...imagination,
                        amount: additiveBonus * multiplicationBonus,
                    },
                }),
            );
        });

    private getCreatePointSubscription = this.doGetCreatePoint
        .pipe(
            withLatestFrom(
                this._store.select(selectIdea),
                this._store.select(selectCreation),
                this._store.select(selectAchievementBonusMult),
                this._store.select(selectBookBonus, 'creationGain'),
                (_, idea, creation, achievementBonus, bookCreationGain) => {
                    if ((idea?.own ?? 0) < (creation?.price() ?? Creation.prototype.price())) return;
                    creation.baseChance += bookCreationGain.reduce(
                        (previous, next) => previous + next.effect(next.chapterRead),
                        0,
                    );
                    if (Math.random() * 100 <= creation.baseChance) {
                        this._store.dispatch(
                            earnCurrency({
                                currency: {
                                    ...creation,
                                    amount: 1 * Math.floor(achievementBonus),
                                },
                            }),
                        );
                    } else {
                        this._store.dispatch(incrementTotalFailedCreation({ number: 1 }));
                    }
                    this._store.dispatch(useIdea({ used: creation.price() }));
                },
            ),
        )
        .subscribe();
}
