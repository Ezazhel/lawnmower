import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, EarningAction, StatsAction } from 'app/root-store';
import { interval, animationFrameScheduler, combineLatest, Subject } from 'rxjs';
import { map, sampleTime, scan, share, withLatestFrom } from 'rxjs/operators';
import { getAllNeighboorsWhereCompletionGtOne } from '../../root-store/neighboor/neighboor-selector';
import { selectMowingGainModifier } from '../../root-store/upgrades/upgrades-selector';
import {
    selectAchievementsNotUnlock,
    selectAchievementsUnlock,
} from '../../root-store/achievements/achievements-selector';
import { unlockAchievementAction } from '../../root-store/achievements/achievements-action';
import { NotifierService } from './notifier.service';
@Injectable({
    providedIn: 'root',
})
export class IdlingService {
    timer$ = interval(1000 / 30, animationFrameScheduler).pipe(
        map(() => ({
            time: Date.now(),
            deltaTime: 0,
        })),
        scan((previous, current) => ({
            time: current.time,
            deltaTime: (current.time - previous.time) / 1000,
        })),
        share(),
    );

    constructor(private store: Store<RootStoreState.State>, private notifier: NotifierService) {}

    doSomething = ([ticker]) => {
        this.doEarnMoneyFromNeighboors$.next(ticker.deltaTime);
    };

    loop$ = combineLatest([this.timer$]).subscribe(this.doSomething);

    doEarnMoneyFromNeighboors$: Subject<number> = new Subject<number>();

    earnMoneyFromNeighboors$ = this.doEarnMoneyFromNeighboors$
        .pipe(
            withLatestFrom(
                this.store.select(getAllNeighboorsWhereCompletionGtOne),
                this.store.select(selectMowingGainModifier),
                this.store.select(selectAchievementsUnlock),
                (deltaModifier, neighboors, gainModifier, achievements) => {
                    let money = neighboors.reduce((previous, current) => {
                        return (
                            previous +
                            current.income *
                                (current.completion *
                                    deltaModifier *
                                    gainModifier *
                                    Math.pow(1.12, achievements.length))
                        );
                    }, 0);
                    if (money != 0) {
                        this.store.dispatch(EarningAction.earnCurrency({ currency: { amount: money, id: '$' } }));
                        this.store.dispatch(StatsAction.incrementTotalMoney({ money }));
                    }
                },
            ),
        )
        .subscribe();

    unlockAchievement$ = combineLatest([this.timer$, this.store, this.store.select(selectAchievementsNotUnlock)])
        .pipe(sampleTime(1000))
        .subscribe(([, state, achievements]) => {
            achievements.forEach((a) => {
                if (a.canUnlock(state)) {
                    this.store.dispatch(unlockAchievementAction({ id: a.id }));
                    this.notifier.pushMessage(`Unlocked achievement : ${a.name}`);
                    if (a.type == 'feature') {
                        a.effect(this.store);
                    }
                }
            });
        });
}
