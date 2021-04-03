import { selectIsCreating } from './../../root-store/blogging/blogging-selector';
import { IdlingService } from '@core/services/idling.service';
import { Injectable } from '@angular/core';
import { RootStoreState } from 'app/root-store';
import { Store } from '@ngrx/store';
import { filter, withLatestFrom } from 'rxjs/operators';
import { selectIsThinking } from 'app/root-store/blogging/blogging-selector';
import { selectCreativity, selectImagination } from 'app/root-store/earning/earning-selector';
import { earnCurrency } from 'app/root-store/earning/earning-action';
import { Creativity, Imagination } from '@core/models/currency';
import { incrementTotalCreativity, incrementTotalImagination } from 'app/root-store/stats/stats-action';

@Injectable({
    providedIn: 'root',
})
export class BloggingService {
    constructor(private _store: Store<RootStoreState.State>, private _idlingService: IdlingService) {}

    thinkSubscription = this._idlingService.timer$
        .pipe(
            withLatestFrom(this._store.select(selectIsThinking), this._store.select(selectImagination)),
            filter(([_, isThinking]) => isThinking),
        )
        .subscribe(([timer, _, imagination]) => {
            imagination ??= new Imagination();
            this._store.dispatch(
                earnCurrency({
                    currency: {
                        ...imagination,
                        amount: timer.deltaTime * imagination.gain,
                    },
                }),
            );
            this._store.dispatch(incrementTotalImagination({ imagination: timer.deltaTime * imagination.gain }));
        });

    createSubscription = this._idlingService.timer$
        .pipe(
            withLatestFrom(this._store.select(selectIsCreating), this._store.select(selectCreativity)),
            filter(([_, isCreating]) => isCreating),
        )
        .subscribe(([timer, _, creation]) => {
            creation ??= new Creativity();
            this._store.dispatch(earnCurrency({ currency: { ...creation, amount: timer.deltaTime * creation.gain } }));
            this._store.dispatch(incrementTotalCreativity({ creativity: timer.deltaTime * creation.gain }));
        });
}
