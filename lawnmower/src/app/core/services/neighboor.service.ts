import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NeighboorAction, RootStoreState, StatsAction } from 'app/root-store';
import { IdlingService } from './idling.service';
import { Neighboor } from '../models/neighboor';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, takeWhile, withLatestFrom } from 'rxjs/operators';
import { selectCuttingLimit, selectEquippedTool } from '../../root-store/neighboor/neighboor-selector';
import {
    selectCuttingLimitModifier,
    selectMowingSpeedUpgradeModifier,
} from '../../root-store/upgrades/upgrades-selector';
import { tools } from '../data/tools-data';
import { Tools } from '../models/tools';
import {
    getAllNeighboors,
    selectNeighboorToCut,
    selectNeighboorToRegrow,
} from '../../root-store/neighboor/neighboor-selector';
import {
    insertNeighboorToRegrow,
    removeNeighboorFromCuttingList,
    removeNeighboorFromRegrowList,
} from '../../root-store/neighboor/neighboor-action';
import { HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { insertOrUpdateNeighboorToCut } from '../../root-store/neighboor/neighboor-action';
import { selectMowingRegrowSpeedUpgradeModifier } from '../../root-store/upgrades/upgrades-selector';

@Injectable({
    providedIn: 'root',
})
export class NeighboorService {
    neighboorToCut$: Observable<Neighboor[]> = this.store.select(selectNeighboorToCut);
    neighboorToRegrow$: Observable<Neighboor[]> = this.store.select(selectNeighboorToRegrow);

    constructor(private idlingService: IdlingService, private store: Store<RootStoreState.State>) {}

    cutSubscription = this.idlingService.timer$
        .pipe(
            withLatestFrom(
                this.neighboorToCut$,
                this.store.select(selectCuttingLimit),
                this.store.select(selectCuttingLimitModifier),
                this.store.select(selectMowingSpeedUpgradeModifier),
                this.store.select(selectEquippedTool),
            ),
            filter(([_, neighboors]) => neighboors.length > 0),
        )
        .subscribe(([timer, neighboors, baseCuttingLimit, cuttingLimitModifier, speedModifier, tool]) => {
            neighboors.forEach((neighboor) => {
                const calculatedCuttingLimit = baseCuttingLimit + cuttingLimitModifier;
                timer.deltaTime *= speedModifier;
                this.cutNeighboor(neighboor, timer, calculatedCuttingLimit, tool);
            });
        });

    regrowSubscription = this.idlingService.timer$
        .pipe(
            withLatestFrom(this.neighboorToRegrow$, 
                this.store.select(selectMowingRegrowSpeedUpgradeModifier)),
            filter(([_, neighboors]) => neighboors.length > 0),
        )
        .subscribe(([timer, neighboors, regrowModifier]) => {
            neighboors.forEach((neighboor) => {
                console.log(timer.deltaTime);
                timer.deltaTime /= regrowModifier;
                console.log(timer.deltaTime);
                this.regrowNeighboor(neighboor, timer);
            });
        });

    private cutNeighboor(neighboor: Neighboor, timer: { deltaTime: number }, cuttingLimit: number, tool: Tools) {
        if (neighboor.cutPercent >= 100) {
            this.store.dispatch(NeighboorAction.cutActionCompleted({ id: neighboor.id, modifier: tool.power }));
            this.store.dispatch(StatsAction.incrementTotalMowned({ mowned: tool.power }));
            this.store.dispatch(NeighboorAction.cutAction({ id: neighboor.id, cutPercent: 0 }));
            neighboor.cuttedTime += 1; //Needed in order to reflect change on store. (I really should use effect);

            if (!neighboor.completedOnce && neighboor.cuttedTime == cuttingLimit) {
                this.store.dispatch(removeNeighboorFromCuttingList({ id: neighboor.id }));
                setTimeout(
                    () => this.store.dispatch(insertOrUpdateNeighboorToCut({ id: neighboor.id, cutted: 0 })),
                    tool.refill * 1000,
                );
            }
            if (neighboor.regrowPercent == 100) {
                this.store.dispatch(insertNeighboorToRegrow({ id: neighboor.id }));
            }
        } else {
            this.store.dispatch(
                NeighboorAction.cutAction({
                    id: neighboor.id,
                    cutPercent: (neighboor.cutPercent += (timer.deltaTime / neighboor.time) * 100),
                }),
            );
        }
    }

    private regrowNeighboor(neighboor: Neighboor, timer: { deltaTime: number }) {
        if (neighboor.completion == 0) {
            this.store.dispatch(removeNeighboorFromRegrowList({ id: neighboor.id }));
            return;
        }
        neighboor.regrowPercent -= ((timer.deltaTime * 1) / neighboor.regrowTime) * 100;
        this.store.dispatch(NeighboorAction.regrowAction({ id: neighboor.id, regrowPercent: neighboor.regrowPercent }));
        if (neighboor.regrowPercent <= 0) {
            this.store.dispatch(NeighboorAction.regrowActionCompleted({ id: neighboor.id, modifier: -1 }));
            neighboor.regrowPercent = 100;
            neighboor.completion -= 1;
            this.store.dispatch(NeighboorAction.regrowAction({ id: neighboor.id, regrowPercent: 100 }));
        }
    }
}
