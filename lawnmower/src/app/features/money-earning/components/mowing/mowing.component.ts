import { Component, OnInit } from '@angular/core';
import { Neighboors } from '@core/data/neighboors-data';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { NeighboorAction } from 'app/root-store/neighboor';
import { Neighboor } from '@core/models/neighboor';
import { Observable } from 'rxjs';
import { Upgrade } from '@core/models/upgrade';
import { selectMowingUpgradeCompletion } from 'app/root-store/upgrades/upgrades-selector';
import { UpgradeBonusService } from '@core/services/upgrade-bonus.service';
@Component({
    selector: 'mowing',
    templateUrl: './mowing.component.html',
    styleUrls: ['./mowing.component.scss'],
})
export class MowingComponent implements OnInit {
    neighboors = Neighboors;
    cutInterval = null;
    upgrades$: Observable<Upgrade[]> = this.store.select(selectMowingUpgradeCompletion);
    constructor(private store: Store<RootStoreState.State>, private upgradeBonus: UpgradeBonusService) {}

    ngOnInit(): void {}

    cut = (neighboor: Neighboor) => {
        if (this.cutInterval == null) {
            this.cutInterval = setInterval(() => {
                neighboor.cut(this.upgradeBonus.speedModifier('mowing'));
                if (neighboor.cutPercent >= 100) {
                    this.store.dispatch(NeighboorAction.cutAction({ id: 0, modifier: 1 }));
                    neighboor.cutCompleted();
                    if (!neighboor.regrowing) this.regrow(neighboor);
                    window.clearInterval(this.cutInterval);
                    this.cutInterval = null;
                }
            }, 50);
        }
    };

    regrow = (neighboor: Neighboor) => {
        neighboor.regrowing = true;
        let interval = setInterval(() => {
            neighboor.regrow(this.upgradeBonus.speedModifier('mowing'));
            if (neighboor.regrowPercent <= 0) {
                this.store.dispatch(NeighboorAction.regrowAction({ id: 0, modifier: -1 }));
                neighboor.regrowCompleted();
                if (neighboor.completion <= 0) {
                    neighboor.regrowing = false;
                    window.clearInterval(interval);
                }
            }
        }, 50);
    };

    trackByFunction(index: number, object: any) {
        return object;
    }
}
