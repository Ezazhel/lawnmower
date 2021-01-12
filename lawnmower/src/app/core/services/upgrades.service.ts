import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, EarningAction } from 'app/root-store';
import { Observable, Subject, Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { selectMoney } from '../../root-store/earning/earning-selector';
import { Upgrade } from '../models/upgrade';
import { unlockMowingUpgradeAction } from '../../root-store/upgrades/upgrades-action';
import { selectMowingUpgradeBoughtValue } from '../../root-store/upgrades/upgrades-selector';

@Injectable({
    providedIn: 'root',
})
export class UpgradesService {
    money$: Observable<number> = this.store.select(selectMoney);
    constructor(private store: Store<RootStoreState.State>) {}
    public doUnlockUpgrade$: Subject<string> = new Subject<string>();

    private _unlockUpgradeSubscription: Subscription = this.doUnlockUpgrade$
        .pipe(
            withLatestFrom(this.store.select(selectMowingUpgradeBoughtValue), this.money$, (id, upgrades, money) => {
                const upgrade: Upgrade = upgrades.find((u) => u.id == id);
                if (money >= upgrade.price && !upgrade.bought) {
                    console.log('buy upgrade');
                    this.store.dispatch(unlockMowingUpgradeAction({ id }));
                    this.store.dispatch(EarningAction.earnMoney({ money: -upgrade.price }));
                }
            }),
        )
        .subscribe();
}
