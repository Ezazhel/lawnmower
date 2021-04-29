import { selectAutomateIdea, selectBlogFeature } from '@root-store/blogging/blogging-selector';
import { selectAchievementBonusMult } from '@root-store/achievements/achievements-selector';
import { selectBookBonus } from '@root-store/blogging/blogging-selector';
import { IdlingService } from '@core/services/idling.service';
import { Injectable } from '@angular/core';
import { RootStoreState } from 'app/root-store';
import { Store } from '@ngrx/store';
import { filter, sampleTime, withLatestFrom } from 'rxjs/operators';
import { selectAllCurrencies, selectEarningState } from 'app/root-store/earning/earning-selector';
import { earnCurrency } from 'app/root-store/earning/earning-action';
import { Creation, Imagination, Idea, Currency, CurrencySymbol } from '@core/models/currency';
import { incrementTotalFailedCreation } from 'app/root-store/stats/stats-action';
import { Subject } from 'rxjs';
import { selectUpgradeAffect } from '@root-store/upgrades/upgrades-selector';
import { assignCurrency } from '@core/utility/utility';

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
                this._store.select(selectEarningState),
                this._store.select(selectAchievementBonusMult),
            ),
            withLatestFrom(this._store.select(selectUpgradeAffect, 'imaginationGain')),
            filter(([[_, { isThinking }]]) => isThinking),
        )
        .subscribe(([[timer, _, { currencies }, achievementBonus], imaginationBonus]) => {
            let imagination = currencies[new Imagination().type] ?? new Imagination();
            const idea = assignCurrency<Idea>(Idea, currencies[new Idea().type]);
            const creation = assignCurrency<Creation>(Creation, currencies[new Creation().type]);
            let additiveBonus =
                imagination.gain +
                (idea?.additiveImaginationGain(idea.amount) ?? 0) +
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
                this._store.select(selectEarningState),
                this._store.select(selectAchievementBonusMult),
                this._store.select(selectBookBonus, 'creationGain'),
                (_, { currencies }, achievementBonus, bookCreationGain) => {
                    const idea = assignCurrency(Idea, currencies[new Idea().type]);
                    const creation = assignCurrency(Creation, currencies[new Creation().type]);
                    if ((idea?.amount ?? 0) < (creation?.price() ?? Creation.prototype.price())) return;
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
                    this._store.dispatch(earnCurrency({ currency: { ...idea, amount: -creation.price() } }));
                },
            ),
        )
        .subscribe();

    automateIdea$ = this._idlingService.timer$
        .pipe(
            withLatestFrom(this._store.select(selectAutomateIdea), this._store.select(selectAllCurrencies)),
            filter(([_, shouldAutomate]) => shouldAutomate),
            sampleTime(200),
        )
        .subscribe(([, , currencies]) => {
            const idea = assignCurrency(
                Idea,
                currencies.find((c) => c.type == 'Idea'),
            );
            const imagination = currencies.find((c) => c.type == 'I');
            const money = currencies.find((c) => c.type == '$');
            this.getIdea('', imagination, idea, money);
        });

    public getIdea(currencySymbol: CurrencySymbol | string, imagination: Imagination, idea: Idea, money: Currency) {
        let ideaGet: number = 0;
        switch (currencySymbol) {
            case 'I':
                if ((imagination?.amount ?? 0) <= idea.price()) return;
                this._store.dispatch(earnCurrency({ currency: { ...imagination, amount: -idea.price() } }));
                ideaGet += 1;
                break;
            case '$':
                if (money.amount <= idea.priceDollar()) return;
                this._store.dispatch(earnCurrency({ currency: { ...money, amount: -idea.priceDollar() } }));
                ideaGet += 1;
                break;
            default:
                if ((imagination?.amount ?? 0) <= idea.price()) break;
                ideaGet += 1;
                this._store.dispatch(earnCurrency({ currency: { ...imagination, amount: -idea.price() } }));
                if (money.amount <= idea.priceDollar()) break;
                ideaGet += 1;
                this._store.dispatch(earnCurrency({ currency: { ...money, amount: -idea.priceDollar() } }));
                break;
        }
        this._store.dispatch(earnCurrency({ currency: { ...idea, amount: ideaGet } }));
    }
}
