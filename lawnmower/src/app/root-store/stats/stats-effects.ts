import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { earnCurrency } from '@root-store/earning/earning-action';
import { cutActionCompleted } from '@root-store/neighboor/neighboor-action';
import { filter, map } from 'rxjs/operators';
import { incrementTotalCreation, incrementTotalMowned, incrementTotalImagination } from './stats-action';

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
            filter(({ currency }) => currency.type == 'C'),
            map(({ currency }) => incrementTotalCreation({ creation: currency.amount })),
        ),
    );

    incrementTotalImagination$ = createEffect(() =>
        this.actions$.pipe(
            ofType(earnCurrency),
            filter(({ currency }) => currency.type == 'I'),
            map(({ currency }) => incrementTotalImagination({ imagination: currency.amount })),
        ),
    );
}
