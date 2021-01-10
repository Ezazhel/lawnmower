import { Injectable } from '@angular/core';
import { Upgrade, UpgradeType } from '@core/models/upgrade';
import { Observable, of } from 'rxjs';
import { RootStoreState } from 'app/root-store';
import { Store } from '@ngrx/store';
import { selectMowingSpeedUpgradeModifier } from '../../root-store/upgrades/upgrades-selector';

@Injectable({
    providedIn: 'root',
})
export class UpgradeBonusService {
    upgrades: Observable<Upgrade[]>;

    constructor(private _store: Store<RootStoreState.State>) {}

    speedModifier = (upgradeType: UpgradeType) => {
        switch (upgradeType) {
            case 'mowing':
                return this.getMowingSpeedModifier();
            default:
                break;
        }
    };

    private getMowingSpeedModifier = () => {
        let _modifier = 1;
        this._store.select(selectMowingSpeedUpgradeModifier).subscribe((modifier) => (_modifier = modifier));
        return _modifier;
    };
}
