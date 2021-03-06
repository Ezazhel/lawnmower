import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CreationPoint, CurrencySymbol, Imagination } from '@core/models/Currencies';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { automateIdea, setIsThinking } from 'app/root-store/blogging/blogging-action';
import {
    selectAutomateIdea,
    selectBookBonus,
    selectBooks,
    selectIsThinking,
} from 'app/root-store/blogging/blogging-selector';
import {
    selectCreationPoint,
    selectIdea,
    selectImagination,
    selectMoney,
} from 'app/root-store/earning/earning-selector';
import { Observable, Subject } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { BloggingService } from '@core/services/blogging.service';
import { Books } from '@core/data/book-data';
import { CurrencyFacadeService } from '@core/facade/currency.facade';

@Component({
    selector: 'blogging-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
    @ViewChild('checkboxIdea')
    checkboxIdea: ElementRef;

    creation$: Observable<CreationPoint> = this.store.select(selectCreationPoint).pipe(
        withLatestFrom(this.store.select(selectBookBonus, 'creationGain')),
        filter(([creation]) => creation !== undefined),
        map(([creation, bookCreationGain]) => {
            creation.baseChance += bookCreationGain.reduce(
                (previous, next) => previous + next.effect(next.chapterRead),
                0,
            );
            return creation;
        }),
    );

    imagination$: Observable<Imagination> = this.currencyFacade.imagination$;
    isThinking$: Observable<boolean> = this.store.select(selectIsThinking);

    idea$ = this.store.select(selectIdea);
    doGetIdea$: Subject<CurrencySymbol> = new Subject();
    money$ = this.store.select(selectMoney);

    isAutomateIdea$: Observable<boolean> = this.store.select(selectAutomateIdea);

    public getIdeaInterval;

    canAutomateIdea$ = this.store
        .select(selectBooks)
        .pipe(map((books) => books.find((b) => b.id == Books.genius.id)?.chapterRead > 0));

    constructor(
        private store: Store<RootStoreState.State>,
        private _bloggingService: BloggingService,
        private currencyFacade: CurrencyFacadeService,
    ) {}

    ngOnInit(): void {}

    getIdeaSubscription = this.doGetIdea$
        .pipe(
            withLatestFrom(this.imagination$, this.idea$, this.money$, (currencySymbol, imagination, idea, money) =>
                this._bloggingService.getIdea(currencySymbol, imagination, idea, money),
            ),
        )
        .subscribe();

    think() {
        this.store.dispatch(setIsThinking());
    }

    create() {
        this._bloggingService.doGetCreatePoint.next();
    }

    mouseDownIdea(currencySymbol: CurrencySymbol) {
        this.doGetIdea$.next(currencySymbol);
        this.getIdeaInterval = setInterval(() => {
            this.doGetIdea$.next(currencySymbol);
        }, 400);
    }
    stopGetIdea() {
        clearInterval(this.getIdeaInterval);
    }

    autoIdea() {
        this.store.dispatch(automateIdea());
    }
}
