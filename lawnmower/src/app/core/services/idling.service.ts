import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, EarningAction, StatsAction } from 'app/root-store';
import { interval, animationFrameScheduler, combineLatest, Subject } from 'rxjs';
import { map, sampleTime, scan, take, tap, withLatestFrom } from 'rxjs/operators';
import { getAllNeighboorsWhereCompletionGtOne, getAllNeighboors } from '../../root-store/neighboor/neighboor-selector';
@Injectable({
    providedIn: 'root',
})
export class IdlingService {
    timer$ = interval(60, animationFrameScheduler).pipe(
        map(() => ({
            time: Date.now(),
            deltaTime: null,
        })),
        scan((previous, current) => ({
            time: current.time,
            deltaTime: (current.time - previous.time) / 1000,
        })),
    );

    constructor(private store: Store<RootStoreState.State>) {}

    doSomething = ([ticker]) => {
        this.doEarnMoney$.next(ticker.deltaTime);
    };

    loop$ = combineLatest([this.timer$]).pipe(sampleTime(60)).subscribe(this.doSomething);

    doEarnMoney$: Subject<number> = new Subject<number>();
    earnMoney$ = this.doEarnMoney$
        .pipe(
            withLatestFrom(this.store.select(getAllNeighboorsWhereCompletionGtOne), (deltaModifier, neighboors) => {
                let money = neighboors.reduce((previous, current) => {
                    return previous + current.income * current.completion * deltaModifier;
                }, 0);
                if (money != 0) {
                    this.store.dispatch(EarningAction.earnMoney({ money }));
                    this.store.dispatch(StatsAction.incrementTotalMoney({ money }));
                }
            }),
        )
        .subscribe();
}
