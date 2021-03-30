import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NeighboorAction, RootStoreState, StatsAction } from 'app/root-store';
import { IdlingService } from './idling.service';
import { Neighboor } from '../models/neighboor';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, takeWhile, withLatestFrom } from 'rxjs/operators';
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

@Injectable({
    providedIn: 'root',
})
export class NeighboorService {
    neighboorToCut$: Observable<Neighboor[]> = this.store.select(selectNeighboorToCut);
    neighboorToRegrow$: Observable<Neighboor[]> = this.store.select(selectNeighboorToRegrow);

    constructor(private idlingService: IdlingService, private store: Store<RootStoreState.State>) {}

    cutSubscription = this.idlingService.timer$
        .pipe(
            withLatestFrom(this.neighboorToCut$),
            filter(([_, neighboors]) => neighboors.length > 0),
        )
        .subscribe(([timer, neighboors]) => {
            neighboors.forEach((neighboor) => {
                this.cutNeighboor(neighboor, timer);
            });
        });

    regrowSubscription = this.idlingService.timer$
        .pipe(
            withLatestFrom(this.neighboorToRegrow$),
            filter(([_, neighboors]) => neighboors.length > 0),
        )
        .subscribe(([timer, neighboors]) => {
            neighboors.forEach((neighboor) => {
                this.regrowNeighboor(neighboor, timer);
            });
        });

    private cutNeighboor(neighboor: Neighboor, timer: { deltaTime: number }) {
        if (neighboor.cutPercent >= 100) {
            this.store.dispatch(NeighboorAction.cutActionCompleted({ id: neighboor.id, modifier: 1 }));
            this.store.dispatch(StatsAction.incrementTotalMowned({ mowned: 1 }));
            neighboor.cutPercent = 0;
            neighboor.completion += 1;
            this.store.dispatch(NeighboorAction.cutAction({ id: neighboor.id, cutPercent: 0 }));
            if (neighboor.regrowPercent == 100) {
                this.store.dispatch(insertNeighboorToRegrow({ id: neighboor.id }));
                //here check cut limit
                if (!neighboor.completedOnce) {
                    this.store.dispatch(removeNeighboorFromCuttingList({ id: neighboor.id }));
                }
            }
        } else {
            this.store.dispatch(
                NeighboorAction.cutAction({
                    id: neighboor.id,
                    cutPercent: (neighboor.cutPercent += ((timer.deltaTime * 1) / neighboor.time) * 100),
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
