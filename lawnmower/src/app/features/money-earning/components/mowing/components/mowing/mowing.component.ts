import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, StatsAction } from 'app/root-store';
import { NeighboorAction } from 'app/root-store/neighboor';
import { Neighboor } from '@core/models/neighboor';
import { Observable, combineLatest } from 'rxjs';
import {
    selectCuttingLimitModifier,
    selectMowingRegrowSpeedUpgradeModifier,
    selectMowingSpeedUpgradeModifier,
} from 'app/root-store/upgrades/upgrades-selector';
import { IdlingService } from '@core/services/idling.service';
import { getAllNeighboors, selectCuttingLimit } from 'app/root-store/neighboor/neighboor-selector';
import { selectEquippedTool } from '../../../../../../root-store/neighboor/neighboor-selector';
import { UpgradeTabsAffected } from '@core/models/upgrade';
@Component({
    selector: 'mowing',
    templateUrl: './mowing.component.html',
    styleUrls: ['./mowing.component.scss'],
})
export class MowingComponent implements OnInit {
    upgradeTab: UpgradeTabsAffected = 'mowing';
    neighboors$: Observable<Neighboor[]> = this.store.select(getAllNeighboors);
    cutInterval = null;
    constructor(private store: Store<RootStoreState.State>, private idlingService: IdlingService) {}

    ngOnInit(): void {}

    cut = (neighboor: Neighboor) => {
        if (neighboor.cutPercent == 0) {
            let _cuttingLimit = null;
            const cut$ = combineLatest([
                this.idlingService.timer$,
                this.store.select(selectMowingSpeedUpgradeModifier),
                this.store.select(selectCuttingLimit),
                this.store.select(selectCuttingLimitModifier),
                this.store.select(selectEquippedTool),
            ]).subscribe(([timer, speedModifier, cuttingLimit, cuttingLimitModifier, tool]) => {
                if (_cuttingLimit == null) _cuttingLimit = cuttingLimit + cuttingLimitModifier;
                if (neighboor.cutPercent >= 100) {
                    _cuttingLimit -= 1;
                    this.store.dispatch(NeighboorAction.cutActionCompleted({ id: neighboor.id, modifier: 1 }));
                    this.store.dispatch(StatsAction.incrementTotalMowned({ mowned: 1 }));
                    neighboor.cutCompleted();
                    this.store.dispatch(NeighboorAction.cutAction({id: neighboor.id, cutPercent: neighboor.cutPercent}))
                    if (!neighboor.regrowing) this.regrow(neighboor);
                    if (_cuttingLimit <= 0) {
                        cut$.unsubscribe();
                    }
                } else {
                    neighboor.cut(timer.deltaTime, speedModifier * tool.power);
                    this.store.dispatch(NeighboorAction.cutAction({id: neighboor.id, cutPercent: neighboor.cutPercent}))
                }
            });
        }
    };

    regrow = (neighboor: Neighboor) => {
        neighboor.regrowing = true;
        const regrow$ = combineLatest([
            this.idlingService.timer$,
            this.store.select(selectMowingRegrowSpeedUpgradeModifier),
        ]).subscribe(([timer, regrowSpeedModifier]) => {
            neighboor.regrow(timer.deltaTime, regrowSpeedModifier);
            this.store.dispatch(NeighboorAction.regrowAction({id: neighboor.id, regrowPercent: neighboor.regrowPercent}))
            if (neighboor.regrowPercent <= 0) {
                this.store.dispatch(NeighboorAction.regrowActionCompleted({ id: neighboor.id, modifier: -1 }));            
                neighboor.regrowCompleted();
                this.store.dispatch(NeighboorAction.regrowAction({id: neighboor.id, regrowPercent: neighboor.regrowPercent}))
                if (neighboor.completedOnce) this.cut(neighboor);
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
