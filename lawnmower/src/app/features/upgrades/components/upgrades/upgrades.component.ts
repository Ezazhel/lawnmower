import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UpgradeFacadeService } from '@core/facade/upgrade.facade';
import { CurrencySymbol } from '@core/models/Currencies';
import { UpgradeState } from '@root-store/upgrades';
import { Observable } from 'rxjs';

@Component({
    selector: 'upgrades',
    templateUrl: './upgrades.component.html',
    styleUrls: ['./upgrades.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpgradesComponent implements OnInit {
    @Input()
    upgradeTab: keyof UpgradeState.State;

    currencies$: Observable<CurrencySymbol[]>;
    constructor(private upgradeFacade: UpgradeFacadeService) {}

    ngOnInit(): void {
        this.currencies$ = this.upgradeFacade.getUpgradeOfFeature(this.upgradeTab);
    }

    trackByCurrency(index: number, currency: CurrencySymbol) {
        return currency;
    }
}
