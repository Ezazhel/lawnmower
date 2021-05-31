import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { RootStoreState, EarningAction } from 'app/root-store';
import { Subject, Subscription } from 'rxjs';
import { filter, withLatestFrom } from 'rxjs/operators';
import { selectAllCurrencies, selectMoney } from 'app/root-store/earning/earning-selector';
import { unlockMowingUpgradeAction, unlockBloggingUpgradeAction } from 'app/root-store/upgrades/upgrades-action';

import { Currency, Money } from '@core/models/Currencies';
import { NotifierService } from './notifier.service';
import { UpgradeBonusByLevel } from '@core/models/Upgrade/UpgradeWithLevel';
import { UpgradeFeature } from '@core/models/Upgrade/UpgradeFeature';

@Injectable({
    providedIn: 'root',
})
export class UpgradesService {
    constructor(private store: Store<RootStoreState.State>, private notifier: NotifierService) {}
    public doUnlockUpgrade$: Subject<UpgradeBonusByLevel> = new Subject<UpgradeBonusByLevel>();

    private _unlockMowingUpgradeSubscription: Subscription = this.doUnlockUpgrade$
        .pipe(
            filter((u) => u.type === 'mowing'),
            withLatestFrom(this.store.select(selectMoney), (upgrade, currency) => {
                this.projectUnlockUpgrade(
                    upgrade,
                    currency.amount,
                    unlockMowingUpgradeAction({ id: upgrade.id }),
                    EarningAction.earnCurrency({ currency: new Money(-upgrade.price()) }),
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
                        currency: {
                            type: upgrade.currency,
                            id: upgrade.currency,
                            amount: -upgrade.price(),
                        },
                    }),
                ),
            ),
        )
        .subscribe();

    private projectUnlockUpgrade(
        upgrade: UpgradeBonusByLevel | UpgradeFeature,
        currency: number,
        UnlockAction: Action,
        LoseMoneyAction: Action,
    ) {
        if (currency >= upgrade.price() && upgrade.level < upgrade.maxLevel) {
            this.store.dispatch(LoseMoneyAction);
            this.store.dispatch(UnlockAction);
            if (upgrade.affect == 'feature') {
                upgrade.effect(this.store, this.notifier);
            }
        }
    }
}
