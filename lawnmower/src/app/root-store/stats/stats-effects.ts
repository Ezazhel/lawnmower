import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { cutActionCompleted } from '@root-store/neighboor/neighboor-action';
import { map, tap } from 'rxjs/operators';
import { incrementTotalMowned } from './stats-action';

@Injectable()
export class StatEffects {
    constructor(private actions$: Actions) {}

    incrementTotalMowned$ = createEffect(() =>
        this.actions$.pipe(
            ofType(cutActionCompleted),
            map(({ modifier }) => incrementTotalMowned({ mowned: modifier })),
        ),
    );
}
