import { Component, Input, OnInit } from '@angular/core';
import { Upgrade } from '@core/models/upgrade';
import { UpgradesService } from '@core/services/upgrades.service';

@Component({
    selector: 'upgrades',
    templateUrl: './upgrades.component.html',
    styleUrls: ['./upgrades.component.scss'],
})
export class UpgradesComponent implements OnInit {
    @Input()
    upgrades: Upgrade[];
    constructor(private upgradeService: UpgradesService) {}

    ngOnInit(): void {}

    unlock(id: string) {
        this.upgradeService.doUnlockUpgrade$.next(id);
    }

    trackByFunction(index: number, object: Upgrade) {
        return index;
    }
}
