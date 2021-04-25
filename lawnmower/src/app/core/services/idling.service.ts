import { selectAllUpgrades } from './../../root-store/upgrades/upgrades-selector';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, EarningAction, StatsAction } from 'app/root-store';
import { interval, animationFrameScheduler, combineLatest, Subject } from 'rxjs';
import { map, sampleTime, scan, share, withLatestFrom } from 'rxjs/operators';
import { getAllNeighboorsWhereCompletionGtOne } from '@root-store/neighboor/neighboor-selector';
import { selectMowingGainModifier } from '@root-store/upgrades/upgrades-selector';
import { selectAchievementsNotUnlock, selectAchievementsUnlock } from '@root-store/achievements/achievements-selector';
import { unlockAchievementAction } from '@root-store/achievements/achievements-action';
import { Achievement } from '@core/models/achievement';
import { NotifierService } from './notifier.service';
import { BloggingUpgrade, MowingUpgrade } from '@core/data/upgrade-data';
import { addBloggingUpgradeAction, addMowingUpgradeAction } from '@root-store/upgrades/upgrades-action';
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
                                    Achievement.prototype.getBonusAchievement(achievements.length))
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
                        a.effect(this.store, this.notifier);
                    }
                }
            });
        });

    unlockUpgrade$ = this.timer$
        .pipe(sampleTime(1000), withLatestFrom(this.store, this.store.select(selectAllUpgrades)))
        .subscribe(([_, store, upgrades]) => {
            const Upgrades = { ...MowingUpgrade, ...BloggingUpgrade };
            Object.values(Upgrades)
                .filter((u) => u.requiredToUnlock !== undefined && upgrades[u.id] === undefined)
                .forEach((u) => {
                    if (u.requiredToUnlock(store)) {
                        switch (u.type) {
                            case 'blogging':
                                this.store.dispatch(addBloggingUpgradeAction({ id: u.id }));
                                break;
                            case 'mowing':
                                this.store.dispatch(addMowingUpgradeAction({ id: u.id }));
                                break;
                        }
                        this.notifier.pushMessage(`New Upgrade : ${u.name}`);
                    }
                });
        });
}
