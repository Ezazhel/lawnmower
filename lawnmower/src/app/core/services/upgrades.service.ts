import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, EarningAction } from 'app/root-store';
import { Observable, Subject, Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { selectMoney } from '../../root-store/earning/earning-selector';
import { MowingUpgrade } from '../data/upgrade-data';
import { Upgrade } from '../models/upgrade';
import { unlockMowingUpgradeAction } from '../../root-store/upgrades/upgrades-action';

@Injectable({
    providedIn: 'root',
})
export class UpgradesService {
    money$: Observable<number> = this.store.select(selectMoney);
    constructor(private store: Store<RootStoreState.State>) {}
    public doUnlockUpgrade$: Subject<string> = new Subject<string>();

    private _unlockUpgradeSubscription: Subscription = this.doUnlockUpgrade$
        .pipe(
            withLatestFrom(this.money$, (id, money) => {
                const upgrade: Upgrade = MowingUpgrade[id];
                if (money >= upgrade.price) {
                    this.store.dispatch(unlockMowingUpgradeAction({ id }));
                    this.store.dispatch(EarningAction.earnMoney({ money: -upgrade.price }));
                }
            }),
        )
        .subscribe();
}
