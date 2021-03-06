import { selectAutomateIdea, selectIsThinking } from 'app/root-store/blogging/blogging-selector';
import { achievementBonusMult } from 'app/root-store/achievements/achievements-selector';
import { selectBookBonus } from 'app/root-store/blogging/blogging-selector';
import { IdlingService } from '@core/services/idling.service';
import { Injectable } from '@angular/core';
import { RootStoreState } from 'app/root-store';
import { Store } from '@ngrx/store';
import { filter, sampleTime, withLatestFrom } from 'rxjs/operators';
import { selectAllCurrencies, selectCurrency, selectImagination } from 'app/root-store/earning/earning-selector';
import { earnCurrency } from 'app/root-store/earning/earning-action';
import { CreationPoint, Idea, Currency, CurrencySymbol } from '@core/models/Currencies';
import { incrementTotalFailedCreation } from 'app/root-store/stats/stats-action';
import { Subject } from 'rxjs';
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
                this._store.select(selectIsThinking),
                this._store.select(selectImagination, 'imaginationGain'),
            ),
            filter(([_, isThinking]) => isThinking),
        )
        .subscribe(([, , imagination]) => {
            if (imagination.amount >= imagination.limit) return;

            const amount = imagination.getGain();
            this._store.dispatch(
                earnCurrency({
                    currency: {
                        ...imagination,
                        amount: amount,
                    },
                }),
            );
        });

    private getCreatePointSubscription = this.doGetCreatePoint
        .pipe(
            withLatestFrom(
                this._store.select(selectCurrency),
                this._store.select(achievementBonusMult, true),
                this._store.select(selectBookBonus, 'creationGain'),
                (_, currency, achievementBonus, bookCreationGain) => {
                    const idea = currency(Idea, 'Idea');
                    const creation = currency(CreationPoint, 'C');
                    if ((idea?.amount ?? 0) < (creation?.price() ?? CreationPoint.prototype.price())) return;

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

    public getIdea(currencySymbol: CurrencySymbol | string, imagination: Currency, idea: Idea, money: Currency) {
        let ideaGet: number = 0;
        switch (currencySymbol) {
            case 'I':
                if ((imagination?.amount ?? 0) <= idea.price() || idea.amount >= idea.limit) return;
                this._store.dispatch(earnCurrency({ currency: { ...imagination, amount: -idea.price() } }));
                ideaGet += 1;
                break;
            case '$':
                if (money.amount <= idea.priceDollar()) return;
                this._store.dispatch(earnCurrency({ currency: { ...money, amount: -idea.priceDollar() } }));
                ideaGet += 1;
                break;
            default:
                if ((imagination?.amount ?? 0) >= idea.price() && idea.amount < idea.limit) {
                    ideaGet += 1;
                    this._store.dispatch(earnCurrency({ currency: { ...imagination, amount: -idea.price() } }));
                }
                if (money.amount >= idea.priceDollar() && idea.canPayToGetIdea) {
                    ideaGet += 1;
                    this._store.dispatch(earnCurrency({ currency: { ...money, amount: -idea.priceDollar() } }));
                }
                break;
        }
        this._store.dispatch(earnCurrency({ currency: { ...idea, amount: ideaGet } }));
    }
}
