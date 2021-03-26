import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, StatsAction } from 'app/root-store';
import { NeighboorAction } from 'app/root-store/neighboor';
import { Neighboor } from '@core/models/neighboor';
import { Observable, combineLatest, Subject } from 'rxjs';
import {
    selectCuttingLimitModifier,
    selectMowingRegrowSpeedUpgradeModifier,
    selectMowingSpeedUpgradeModifier,
} from 'app/root-store/upgrades/upgrades-selector';
import { IdlingService } from '@core/services/idling.service';
import { getAllNeighboors, selectCuttingLimit } from 'app/root-store/neighboor/neighboor-selector';
import { selectEquippedTool } from '../../../../../../root-store/neighboor/neighboor-selector';
import { UpgradeTabsAffected } from '@core/models/upgrade';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { Tools } from '@core/models/tools';
@Component({
    selector: 'mowing',
    templateUrl: './mowing.component.html',
    styleUrls: ['./mowing.component.scss'],
})
export class MowingComponent implements OnInit {
    upgradeTab: UpgradeTabsAffected = 'mowing';
    neighboors$: Observable<Neighboor[]> = this.store.select(getAllNeighboors);
    cut$: Subject<Neighboor> = new Subject();

    cutInterval = null;
    constructor(private store: Store<RootStoreState.State>, private idlingService: IdlingService) {}

    ngOnInit(): void {}

    cuttt = this.idlingService.timer$
        .pipe(
            withLatestFrom(
                this.cut$,
                this.store.select(selectMowingSpeedUpgradeModifier),
                this.store.select(selectCuttingLimit),
                this.store.select(selectCuttingLimitModifier),
                this.store.select(selectEquippedTool),
            ),
            filter(([_, n]) => n != null),
            map(([timer, neighboor, speedModifier, cuttingLimit, cuttingLimitModifier, tool]) =>
                this.cut(timer, neighboor, speedModifier, cuttingLimit, cuttingLimitModifier, tool),
            ),
        )
        .subscribe();
    docut = this.cut$.pipe(tap((n) => console.log(n))).subscribe();
    cut = (
        timer: { time: number; deltaTime: number },
        neighboor: Neighboor,
        speedModifier: number,
        cuttingLimit: number,
        cuttingLimitModifier: number,
        tool: Tools,
    ) => {
        let _cuttingLimit = cuttingLimit + cuttingLimitModifier;
        if (neighboor.cutPercent >= 100) {
            _cuttingLimit -= 1;
            this.store.dispatch(NeighboorAction.cutActionCompleted({ id: neighboor.id, modifier: 1 }));
            this.store.dispatch(StatsAction.incrementTotalMowned({ mowned: 1 }));
            this.store.dispatch(NeighboorAction.cutAction({ id: neighboor.id, cutPercent: 0 }));
            if (!neighboor.regrowing) this.regrow(neighboor);
            this.cut$.next(null);
        } else {
            this.store.dispatch(
                NeighboorAction.cutAction({
                    id: neighboor.id,
                    cutPercent: (neighboor.cutPercent += ((timer.deltaTime * speedModifier) / neighboor.time) * 100),
                }),
            );
        }
    };
    regrow = (neighboor: Neighboor) => {
        neighboor.regrowing = true;
        const regrow$ = combineLatest([
            this.idlingService.timer$,
            this.store.select(selectMowingRegrowSpeedUpgradeModifier),
        ]).subscribe(([timer, regrowSpeedModifier]) => {
            neighboor.regrowPercent -= ((timer.deltaTime * regrowSpeedModifier) / neighboor.regrowTime) * 100;
            this.store.dispatch(
                NeighboorAction.regrowAction({ id: neighboor.id, regrowPercent: neighboor.regrowPercent }),
            );
            if (neighboor.regrowPercent <= 0) {
                this.store.dispatch(NeighboorAction.regrowActionCompleted({ id: neighboor.id, modifier: -1 }));
                neighboor.regrowCompleted();
                this.store.dispatch(
                    NeighboorAction.regrowAction({ id: neighboor.id, regrowPercent: neighboor.regrowPercent }),
                );
                if (neighboor.completedOnce) this.cut$.next(neighboor);
                if (neighboor.completion <= 0) {
                    neighboor.regrowing = false;
                    regrow$.unsubscribe();
                }
            }
        });
    };

    trackByFunction(index: number, object: Neighboor) {
        return object;
    }
}
