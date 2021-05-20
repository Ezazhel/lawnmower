import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { earnCurrency } from 'app/root-store/earning/earning-action';
import { cutActionCompleted } from 'app/root-store/neighboor/neighboor-action';
import { filter, map } from 'rxjs/operators';
import {
    incrementTotalCreation,
    incrementTotalMowned,
    incrementTotalImagination,
    incrementTotalIdea,
} from './stats-action';

@Injectable()
export class StatEffects {
    constructor(private actions$: Actions) {}

    incrementTotalMowned$ = createEffect(() =>
        this.actions$.pipe(
            ofType(cutActionCompleted),
            map(({ modifier }) => incrementTotalMowned({ mowned: modifier })),
        ),
    );

    incrementTotalCreation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(earnCurrency),
            filter(({ currency }) => currency.type == 'C' && currency.amount > 0),
            map(({ currency }) => incrementTotalCreation({ creation: currency.amount })),
        ),
    );

    incrementTotalImagination$ = createEffect(() =>
        this.actions$.pipe(
            ofType(earnCurrency),
            filter(({ currency }) => currency.type == 'I' && currency.amount > 0),
            map(({ currency }) => incrementTotalImagination({ imagination: currency.amount })),
        ),
    );

    incrementTotalIdea$ = createEffect(() =>
        this.actions$.pipe(
            ofType(earnCurrency),
            filter(({ currency }) => currency.type == 'Idea' && currency.amount > 0),
            map(() => incrementTotalIdea({ idea: 1 })),
        ),
    );
}
