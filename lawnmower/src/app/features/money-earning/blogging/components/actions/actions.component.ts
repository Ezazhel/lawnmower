import { Component, OnInit } from '@angular/core';
import { Creation, Imagination } from '@core/models/currency';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { setIsThinking } from '@root-store/blogging/blogging-action';
import { selectIsThinking } from '@root-store/blogging/blogging-selector';
import { earnCurrency } from '@root-store/earning/earning-action';
import { selectCreation, selectIdea, selectImagination } from '@root-store/earning/earning-selector';
import { Observable, Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { BloggingService } from '@core/services/blogging.service';

@Component({
    selector: 'blogging-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
    creation$: Observable<Creation> = this.store.select(selectCreation);

    imagination$: Observable<Imagination> = this.store.select(selectImagination);
    isThinking$: Observable<boolean> = this.store.select(selectIsThinking);

    idea$ = this.store.select(selectIdea);
    doGetIdea$: Subject<void> = new Subject();
    constructor(private store: Store<RootStoreState.State>, private _bloggingService: BloggingService) {}

    ngOnInit(): void {}

    getIdeaSubscription = this.doGetIdea$
        .pipe(
            withLatestFrom(this.imagination$, this.idea$, (_, imagination, idea) => {
                if ((imagination?.amount ?? 0) <= idea.price()) return;
                this.store.dispatch(earnCurrency({ currency: { ...idea, amount: 1 } }));
                this.store.dispatch(earnCurrency({ currency: { ...imagination, amount: -idea.price() } }));
            }),
        )
        .subscribe();

    think() {
        this.store.dispatch(setIsThinking());
    }

    create() {
        this._bloggingService.doGetCreatePoint.next();
    }
}
