import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CurrencySymbol } from '@core/models/Currencies';
import { UpgradeTabsAffected } from '@core/models/Upgrade';
import { select, Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { selectSpecificUpgradeCurrency } from 'app/root-store/upgrades/upgrades-selector';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'upgrades',
    templateUrl: './upgrades.component.html',
    styleUrls: ['./upgrades.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpgradesComponent implements OnInit {
    @Input()
    upgradeTab: UpgradeTabsAffected;

    currencies$: Observable<CurrencySymbol[]> = null;
    constructor(private store: Store<RootStoreState.State>) {}

    ngOnInit(): void {
        this.currencies$ = this.store.select(selectSpecificUpgradeCurrency, this.upgradeTab);
    }

    trackByCurrency(index: number, currency: CurrencySymbol) {
        return currency;
    }
}
