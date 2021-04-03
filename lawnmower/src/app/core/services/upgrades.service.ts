import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { RootStoreState, EarningAction } from 'app/root-store';
import { Subject, Subscription } from 'rxjs';
import { filter, withLatestFrom } from 'rxjs/operators';
import { selectAllCurrencies, selectMoney } from '../../root-store/earning/earning-selector';
import { Upgrade } from '@core/models/upgrade';
import { unlockMowingUpgradeAction, unlockBloggingUpgradeAction } from '../../root-store/upgrades/upgrades-action';

import { Currency, CurrencySymbol, Money } from '@core/models/currency';

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
                    EarningAction.earnCurrency({ currency: new Money(-upgrade.price(upgrade.level - 1)) }),
                );
            }),
        )
        .subscribe();

    private _unlockBlogginUpgradeSubscription: Subscription = this.doUnlockUpgrade$
        .pipe(
            filter((u) => u.type === 'blogging'),
            withLatestFrom(this.store.select(selectAllCurrencies), (upgrade, currencies: Currency[]) =>
                this.projectUnlockUpgrade(
                    upgrade,
                    currencies.find((c) => c.type == upgrade.currency).amount,
                    unlockBloggingUpgradeAction({ id: upgrade.id }),
                    EarningAction.earnCurrency({
                        currency: { id: upgrade.currency, amount: -upgrade.price(upgrade.level - 1) },
                    }),
                ),
            ),
        )
        .subscribe();

    private projectUnlockUpgrade(upgrade: Upgrade, currency: number, UnlockAction: Action, LoseMoneyAction: Action) {
        if (currency >= upgrade.price(upgrade.level) && upgrade.level < upgrade.maxLevel) {
            this.store.dispatch(UnlockAction);
            this.store.dispatch(LoseMoneyAction);
            if (upgrade.affect == 'feature') {
                upgrade.effect(this.store);
            }
        }
    }
}
