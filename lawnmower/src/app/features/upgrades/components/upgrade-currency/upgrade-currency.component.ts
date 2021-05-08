import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UpgradesService } from '@core/services/upgrades.service';
import { select, Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { selectAllCurrencies } from 'app/root-store/earning/earning-selector';
import { selectUpgradeForCurrencyAndTabs } from 'app/root-store/upgrades/upgrades-selector';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrencySymbol } from '@core/models/Currencies';
import { UpgradeTabsAffected, Upgrade } from '@core/models/Upgrade';

@Component({
    selector: 'app-upgrade-currency',
    templateUrl: './upgrade-currency.component.html',
    styleUrls: ['./upgrade-currency.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpgradeCurrencyComponent implements OnInit {
    @Input()
    currencySymbol: CurrencySymbol;

    @Input()
    upgradeTab: UpgradeTabsAffected;

    upgrades$: Observable<Upgrade[]>;

    currency$: Observable<number> = this.store.pipe(
        select(selectAllCurrencies),
        map((currencies) => currencies.find((c) => c.type == this.currencySymbol)?.amount ?? 0),
    );
    constructor(private store: Store<RootStoreState.State>, private upgradeService: UpgradesService) {}

    ngOnInit(): void {
        this.upgrades$ = this.store.select(selectUpgradeForCurrencyAndTabs, {
            symbol: this.currencySymbol,
            tabs: this.upgradeTab,
        });
    }

    unlock(upgrade: Upgrade) {
        this.upgradeService.doUnlockUpgrade$.next(upgrade);
    }

    trackByUpgrade(index: number, upgrade: Upgrade) {
        return upgrade.id;
    }
}
