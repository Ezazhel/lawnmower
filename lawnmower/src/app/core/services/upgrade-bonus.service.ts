import { Injectable } from '@angular/core';
import { Upgrade } from '@core/models/upgrade';
import { Observable, of } from 'rxjs';
import { RootStoreState } from 'app/root-store';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root',
})
export class UpgradeBonusService {
    upgrades: Observable<Upgrade[]>;

    constructor(private _store: Store<RootStoreState.State>) {}
}
