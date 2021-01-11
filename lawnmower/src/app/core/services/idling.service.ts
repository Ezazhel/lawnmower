import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, EarningAction, StatsAction } from 'app/root-store';
import { interval, animationFrameScheduler, combineLatest, Subject } from 'rxjs';
import { map, sampleTime, scan, withLatestFrom } from 'rxjs/operators';
import { getAllNeighboorsWhereCompletionGtOne, getAllNeighboors } from '../../root-store/neighboor/neighboor-selector';
import { selectMowingGainModifier } from '../../root-store/upgrades/upgrades-selector';
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
        this.doEarnMoneyFromNeighboors$.next(ticker.deltaTime);
    };

    loop$ = combineLatest([this.timer$]).pipe(sampleTime(60)).subscribe(this.doSomething);

    doEarnMoneyFromNeighboors$: Subject<number> = new Subject<number>();
    earnMoneyFromNeighboors$ = this.doEarnMoneyFromNeighboors$
        .pipe(
            withLatestFrom(
                this.store.select(getAllNeighboorsWhereCompletionGtOne),
                this.store.select(selectMowingGainModifier),
                (deltaModifier, neighboors, gainModifier) => {
                    let money = neighboors.reduce((previous, current) => {
                        return previous + current.income * current.completion * deltaModifier * gainModifier;
                    }, 0);
                    if (money != 0) {
                        this.store.dispatch(EarningAction.earnMoney({ money }));
                        this.store.dispatch(StatsAction.incrementTotalMoney({ money }));
                    }
                },
            ),
        )
        .subscribe();
}
