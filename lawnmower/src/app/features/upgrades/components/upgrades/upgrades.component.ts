import { Component, Input, OnInit } from '@angular/core';
import { Upgrade } from '@core/models/upgrade';
import { UpgradesService } from '@core/services/upgrades.service';
import { CurrencySymbol } from '../../../../core/models/currency';

@Component({
    selector: 'upgrades',
    templateUrl: './upgrades.component.html',
    styleUrls: ['./upgrades.component.scss'],
})
export class UpgradesComponent implements OnInit {
    @Input()
    set upgrades(upgrades: Upgrade[]) {
        const map = new Map<CurrencySymbol, Upgrade[]>();
        upgrades.forEach((item) => {
            const key = item.currency;
            const collection = map.get(key);
            if (!collection) map.set(key, [item]);
            else collection.push(item);
        });
        this.MappedUpgrades = map;
    }
    public MappedUpgrades: Map<CurrencySymbol, Upgrade[]>;

    constructor(private upgradeService: UpgradesService) {}

    ngOnInit(): void {}

    unlock(upgrade: Upgrade) {
        this.upgradeService.doUnlockUpgrade$.next(upgrade);
    }

    trackByCurrency(index: number, currency: CurrencySymbol) {
        return currency;
    }
    trackByFunction(index: number, upgrade: Upgrade) {
        return upgrade;
    }

    currencySymbolArray() {
        return [...this.MappedUpgrades.keys()];
    }
    upgradeArray(key: CurrencySymbol) {
        return this.MappedUpgrades.get(key);
    }
}
