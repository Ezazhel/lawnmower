import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { RootStoreState, EarningAction, BloggingAction } from 'app/root-store';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { selectMoney } from '../../root-store/earning/earning-selector';
import { Upgrade } from '@core/models/upgrade';
import { unlockMowingUpgradeAction, unlockBloggingUpgradeAction } from '../../root-store/upgrades/upgrades-action';
import {
    selectImagination,
    selectCreativity,
    selectBloggingCurrencies,
} from '../../root-store/blogging/blogging-selector';
import { Currency, CurrencySymbol } from '@core/models/currency';

@Injectable({
    providedIn: 'root',
})
export class UpgradesService {
    constructor(private store: Store<RootStoreState.State>) {}
    public doUnlockUpgrade$: Subject<Upgrade> = new Subject<Upgrade>();

    private _unlockMowingUpgradeSubscription: Subscription = this.doUnlockUpgrade$
        .pipe(
            filter((u) => u.type === 'mowing'),
            withLatestFrom(this.store.select(selectMoney), (upgrade, currency) => {
                this.projectUnlockUpgrade(
                    upgrade,
                    currency.amount,
                    unlockMowingUpgradeAction({ id: upgrade.id }),
                    EarningAction.earnMoney({ money: -upgrade.price(upgrade.level - 1) }),
                );
            }),
        )
        .subscribe();

    private _unlockBlogginUpgradeSubscription: Subscription = this.doUnlockUpgrade$
        .pipe(
            filter((u) => u.type === 'blogging'),
            withLatestFrom(this.store.select(selectBloggingCurrencies), (upgrade, currencies: Currency[]) =>
                this.projectUnlockUpgrade(
                    upgrade,
                    currencies.find((c) => c.type == upgrade.currency).amount,
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

    private projectUnlockUpgrade(upgrade: Upgrade, currency: number, UnlockAction: Action, LoseMoneyAction: Action) {
        if (currency >= upgrade.price(upgrade.level) && upgrade.level < upgrade.maxLevel) {
            this.store.dispatch(UnlockAction);
            this.store.dispatch(LoseMoneyAction);
        }
    }
}
