import { Injectable } from '@angular/core';
import { State } from 'app/root-store/upgrades/upgrades-state';
import { Store } from '@ngrx/store';
import { selectSpecificUpgradeCurrency } from 'app/root-store/upgrades/upgrades-selector';
import { RootStoreState } from 'app/root-store/';

@Injectable({ providedIn: 'root' })
export class UpgradeFacadeService {
    constructor(private store: Store<RootStoreState.State>) {}

    getUpgradeOfFeature(feature: keyof State) {
        return this.store.select(selectSpecificUpgradeCurrency, feature);
    }
}
