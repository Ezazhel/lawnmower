import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootStoreState, EarningAction, StatsAction } from 'app/root-store';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { getCompletion } from '../../root-store/neighboor/neighboor-selector';
import { Neighboors } from '../data/neighboors-data';

@Injectable({
    providedIn: 'root',
})
export class IdlingService {
    deltaModifier: number;
    lastUpdate: number = null;
    constructor(private store: Store<RootStoreState.State>) {}

    loop() {
        let loop = interval(50);
        loop.subscribe(() => {
            const currentTime = Date.now();
            if (this.lastUpdate == null) this.lastUpdate = currentTime;
            this.deltaModifier = (currentTime - this.lastUpdate) / 1000;
            this.earnMoney();
            this.lastUpdate = Date.now();
        });
    }
    earnMoney() {
        //select neighboors, foreach; Object.assign from const for easier management; completion * money * bonus * deltaTime= dollar.
        // Call earnMoney ; incrementTotalMoney.
        this.store
            .select(getCompletion, 0)
            .pipe(take(1))
            .subscribe((completion) => {
                const n = Object.assign(Neighboors[0], { completion });
                let money = n.income * completion * this.deltaModifier;
                this.store.dispatch(EarningAction.earnMoney({ money }));
                this.store.dispatch(StatsAction.incrementTotalMoney({ money }));
            });
    }
}
