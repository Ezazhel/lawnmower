import { Injectable } from '@angular/core';
import { NotifierService } from '@core/services/notifier.service';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { interval } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap, sampleTime } from 'rxjs/operators';
import { RootStoreState } from '..';
import * as HydrationActions from './hydration.actions';

@Injectable()
export class HydrationEffects implements OnInitEffects {
    hydrate$ = createEffect(() =>
        this.action$.pipe(
            ofType(HydrationActions.hydrate),
            map(() => {
                const storageValue = localStorage.getItem('state');
                if (storageValue) {
                    try {
                        const state = JSON.parse(storageValue);
                        return HydrationActions.hydrateSuccess({ state });
                    } catch {
                        localStorage.removeItem('state');
                    }
                }
                return HydrationActions.hydrateFailure();
            }),
        ),
    );

    serialize$ = createEffect(
        () =>
            this.action$.pipe(
                ofType(HydrationActions.hydrateSuccess, HydrationActions.hydrateFailure),
                switchMap(() => this.store),
                distinctUntilChanged(),
                sampleTime(5000),
                tap((state) => localStorage.setItem('state', JSON.stringify(state))),
                tap(() => this.notifier.pushMessage('Saved', 1000)),
            ),
        { dispatch: false },
    );

    constructor(
        private action$: Actions,
        private store: Store<RootStoreState.State>,
        private notifier: NotifierService,
    ) {}

    ngrxOnInitEffects(): Action {
        return HydrationActions.hydrate();
    }
}
