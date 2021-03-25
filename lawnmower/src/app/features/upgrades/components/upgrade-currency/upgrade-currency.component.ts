import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Upgrade } from '@core/models/upgrade';
import { UpgradesService } from '@core/services/upgrades.service';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { selectUpgradeForCurrencyAndTabs } from 'app/root-store/upgrades/upgrades-selector';
import { Observable } from 'rxjs';
import { CurrencySymbol } from '../../../../core/models/currency';
import { UpgradeTabsAffected } from '../../../../core/models/upgrade';

@Component({
    selector: 'app-upgrade-currency',
    templateUrl: './upgrade-currency.component.html',
    styleUrls: ['./upgrade-currency.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpgradeCurrencyComponent implements OnInit {
    @Input()
    currency: CurrencySymbol;

    @Input()
    upgradeTab: UpgradeTabsAffected;

    upgrades$: Observable<Upgrade[]>;

    constructor(private store: Store<RootStoreState.State>, private upgradeService: UpgradesService) {}

    ngOnInit(): void {
        this.upgrades$ = this.store.select(selectUpgradeForCurrencyAndTabs, {
            symbol: this.currency,
            tabs: this.upgradeTab,
        });
    }

    unlock(upgrade: Upgrade) {
        this.upgradeService.doUnlockUpgrade$.next(upgrade);
    }
}
