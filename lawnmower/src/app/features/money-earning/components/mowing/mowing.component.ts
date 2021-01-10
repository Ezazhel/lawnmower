import { Component, OnInit } from '@angular/core';
import { Neighboors } from '@core/data/neighboors-data';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { NeighboorAction } from 'app/root-store/neighboor';
import { Neighboor } from '@core/models/neighboor';
import { Observable, combineLatest } from 'rxjs';
import { Upgrade } from '@core/models/upgrade';
import {
    selectMowingSpeedUpgradeModifier,
    selectMowingUpgradeCompletion,
} from 'app/root-store/upgrades/upgrades-selector';
import { IdlingService } from '../../../../core/services/idling.service';
import { sampleTime } from 'rxjs/operators';
@Component({
    selector: 'mowing',
    templateUrl: './mowing.component.html',
    styleUrls: ['./mowing.component.scss'],
})
export class MowingComponent implements OnInit {
    neighboors = [...Object.values(Neighboors)];
    cutInterval = null;
    upgrades$: Observable<Upgrade[]> = this.store.select(selectMowingUpgradeCompletion);
    constructor(private store: Store<RootStoreState.State>, private idlingService: IdlingService) {}

    ngOnInit(): void {}

    cut = (neighboor: Neighboor) => {
        console.log(neighboor.cutting);
        if (!neighboor.cutting) {
            neighboor.cutting = true;
            const cut$ = combineLatest([this.idlingService.timer$, this.store.select(selectMowingSpeedUpgradeModifier)])
                .pipe(sampleTime(60))
                .subscribe(([timer, speedModifier]) => {
                    neighboor.cut(timer.deltaTime, speedModifier);
                    if (neighboor.cutPercent >= 100) {
                        this.store.dispatch(NeighboorAction.cutAction({ id: neighboor.id, modifier: 1 }));
                        neighboor.cutCompleted();
                        if (!neighboor.regrowing) this.regrow(neighboor);
                        cut$.unsubscribe();
                    }
                });
        }
    };

    regrow = (neighboor: Neighboor) => {
        neighboor.regrowing = true;
        const regrow$ = combineLatest([this.idlingService.timer$, this.store.select(selectMowingSpeedUpgradeModifier)])
            .pipe(sampleTime(60))
            .subscribe(([timer, speedModifier]) => {
                neighboor.regrow(timer.deltaTime, speedModifier);
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
        return object;
    }
}
