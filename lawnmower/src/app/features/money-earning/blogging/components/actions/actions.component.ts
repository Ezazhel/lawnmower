import { Component, OnInit } from '@angular/core';
import { Creation, CurrencySymbol, Imagination } from '@core/models/currency';
import { select, Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { setIsThinking } from '@root-store/blogging/blogging-action';
import { selectBookBonus, selectIsThinking } from '@root-store/blogging/blogging-selector';
import { earnCurrency } from '@root-store/earning/earning-action';
import { selectCreation, selectIdea, selectImagination, selectMoney } from '@root-store/earning/earning-selector';
import { Observable, Subject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { BloggingService } from '@core/services/blogging.service';

@Component({
    selector: 'blogging-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
    creation$: Observable<Creation> = this.store.select(selectCreation).pipe(
        withLatestFrom(this.store.select(selectBookBonus, 'creationGain')),
        map(([creation, bookCreationGain]) => {
            creation.baseChance += bookCreationGain.reduce(
                (previous, next) => previous + next.effect(next.chapterRead),
                0,
            );
            return creation;
        }),
    );

    imagination$: Observable<Imagination> = this.store.select(selectImagination);
    isThinking$: Observable<boolean> = this.store.select(selectIsThinking);

    idea$ = this.store.select(selectIdea);
    doGetIdea$: Subject<CurrencySymbol> = new Subject();
    doGetIdeaWithDollar: Subject<void> = new Subject();

    constructor(private store: Store<RootStoreState.State>, private _bloggingService: BloggingService) {}

    ngOnInit(): void {}

    getIdeaSubscription = this.doGetIdea$
        .pipe(
            withLatestFrom(
                this.imagination$,
                this.idea$,
                this.store.select(selectMoney),
                (currencySymbol, imagination, idea, money) => {
                    switch (currencySymbol) {
                        case 'I':
                            if ((imagination?.amount ?? 0) <= idea.price()) return;
                            this.store.dispatch(earnCurrency({ currency: { ...imagination, amount: -idea.price() } }));
                            break;
                        case '$':
                            if (money.amount <= idea.priceDollar()) return;
                            this.store.dispatch(earnCurrency({ currency: { ...money, amount: -idea.priceDollar() } }));
                            break;
                    }
                    this.store.dispatch(earnCurrency({ currency: { ...idea, amount: 1 } }));
                },
            ),
        )
        .subscribe();

    think() {
        this.store.dispatch(setIsThinking());
    }

    create() {
        this._bloggingService.doGetCreatePoint.next();
    }
}
