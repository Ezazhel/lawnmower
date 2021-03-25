import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { RootStoreState, EarningAction, BloggingAction } from 'app/root-store';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { selectMoney } from '../../root-store/earning/earning-selector';
import { Upgrade, UpgradeType } from '../models/upgrade';
import { unlockMowingUpgradeAction, unlockBloggingUpgradeAction } from '../../root-store/upgrades/upgrades-action';
import {
    selectMowingUpgradeLevelValue,
    selectBloggingUpgradeLevelValue,
} from '../../root-store/upgrades/upgrades-selector';
import { selectImagination, selectCreativity } from '../../root-store/blogging/blogging-selector';
import { CurrencySymbol } from '../models/currency';

@Injectable({
    providedIn: 'root',
})
export class UpgradesService {
    constructor(private store: Store<RootStoreState.State>) {}
    public doUnlockUpgrade$: Subject<Upgrade> = new Subject<Upgrade>();

    private _unlockMowingUpgradeSubscription: Subscription = this.doUnlockUpgrade$
        .pipe(
            filter((u) => u.type === 'mowing'),
            withLatestFrom(this.getUnlockCurrency('$'), (upgrade, currency) => {
                this.projectUnlockUpgrade(
                    upgrade,
                    currency,
                    unlockMowingUpgradeAction({ id: upgrade.id }),
                    EarningAction.earnMoney({ money: -upgrade.price(upgrade.level - 1) }),
                );
            }),
        )
        .subscribe();

    private _unlockBlogginUpgradeSubscription: Subscription = this.doUnlockUpgrade$
        .pipe(
            filter((u) => u.type === 'blogging'),
            withLatestFrom(this.getUnlockCurrency('I'), (upgrade, currency) =>
                this.projectUnlockUpgrade(
                    upgrade,
                    currency,
                    unlockBloggingUpgradeAction({ id: upgrade.id }),
                    this.getActionLoseCurrencyForBlogging(upgrade),
                ),
            ),
        )
        .subscribe();

    private getActionLoseCurrencyForBlogging(upgrade: Upgrade): Action {
        const amount = -upgrade.price(upgrade.level) - 1;
        return upgrade.currency == 'C'
            ? BloggingAction.earnCreativity({ amount })
            : BloggingAction.earnImagination({ amount });
    }

    private getUnlockCurrency(symbol: CurrencySymbol): Observable<number> {
        switch (symbol) {
            case '$':
                return this.store.select(selectMoney);
            case 'I':
                return this.store.select(selectImagination).pipe(map((i) => i.amount));
            case 'C':
                return this.store.select(selectCreativity).pipe(map((c) => c.amount));
        }
    }

    private projectUnlockUpgrade(upgrade: Upgrade, currency: number, UnlockAction: Action, LoseMoneyAction: Action) {
        if (currency >= upgrade.price(upgrade.level) && upgrade.level < upgrade.maxLevel) {
            this.store.dispatch(UnlockAction);
            this.store.dispatch(LoseMoneyAction);
        }
    }
}
