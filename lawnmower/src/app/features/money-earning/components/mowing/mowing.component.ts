import { Component, OnInit } from '@angular/core';
import { Neighboors } from '@core/data/neighboors-data';
import { Store } from '@ngrx/store';
import { RootStoreState, StatsAction } from 'app/root-store';
import { NeighboorAction } from 'app/root-store/neighboor';
import { Neighboor } from '@core/models/neighboor';
import { Observable, combineLatest } from 'rxjs';
import { Upgrade } from '@core/models/upgrade';
import {
    selectCuttingLimitModifier,
    selectMowingRegrowSpeedUpgradeModifier,
    selectMowingSpeedUpgradeModifier,
    selectMowingUpgradeBoughtValue,
} from 'app/root-store/upgrades/upgrades-selector';
import { IdlingService } from '@core/services/idling.service';
import { sampleTime, switchMap } from 'rxjs/operators';
import { getAllNeighboors, selectCuttingLimit } from 'app/root-store/neighboor/neighboor-selector';
@Component({
    selector: 'mowing',
    templateUrl: './mowing.component.html',
    styleUrls: ['./mowing.component.scss'],
})
export class MowingComponent implements OnInit {
    neighboors$: Observable<Neighboor[]> = this.store.select(getAllNeighboors);
    cutInterval = null;
    upgrades$: Observable<Upgrade[]> = this.store.select(selectMowingUpgradeBoughtValue);
    constructor(private store: Store<RootStoreState.State>, private idlingService: IdlingService) {}

    ngOnInit(): void {}

    cut = (neighboor: Neighboor) => {
        if (!neighboor.cutting) {
            let _cuttingLimit = null;
            const cut$ = combineLatest([
                this.idlingService.timer$,
                this.store.select(selectMowingSpeedUpgradeModifier),
                this.store.select(selectCuttingLimit),
                this.store.select(selectCuttingLimitModifier),
            ]).subscribe(([timer, speedModifier, cuttingLimit, cuttingLimitModifier]) => {
                neighboor.cutting = true;
                if (_cuttingLimit == null) _cuttingLimit = cuttingLimit + cuttingLimitModifier;
                if (neighboor.cutPercent >= 100) {
                    console.log(_cuttingLimit);
                    _cuttingLimit -= 1;
                    this.store.dispatch(NeighboorAction.cutAction({ id: neighboor.id, modifier: 1 }));
                    this.store.dispatch(StatsAction.incrementTotalMowned({ mowned: 1 }));
                    neighboor.cutCompleted();
                    if (!neighboor.regrowing) this.regrow(neighboor);
                    if (_cuttingLimit <= 0) {
                        cut$.unsubscribe();
                    }
                }
                neighboor.cut(timer.deltaTime, speedModifier);
              
            });
        }
    };

    regrow = (neighboor: Neighboor) => {
        neighboor.regrowing = true;
        const regrow$ = combineLatest([
            this.idlingService.timer$,
            this.store.select(selectMowingRegrowSpeedUpgradeModifier),
        ])
            .pipe(sampleTime(60))
            .subscribe(([timer, regrowSpeedModifier]) => {
                neighboor.regrow(timer.deltaTime, regrowSpeedModifier);
                if (neighboor.regrowPercent <= 0) {
                    this.store.dispatch(NeighboorAction.regrowAction({ id: neighboor.id, modifier: -1 }));
                    neighboor.regrowCompleted();
                    if (neighboor.completion <= 0) {
                        neighboor.regrowing = false;
                        regrow$.unsubscribe();
                    }
                }
            });
    };

    trackByFunction(index: number, object: any) {
        return index;
    }
}
