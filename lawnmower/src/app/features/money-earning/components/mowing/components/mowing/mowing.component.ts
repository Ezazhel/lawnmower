import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { Neighboor } from '@core/models/neighboor';
import { Observable } from 'rxjs';
import { getAllNeighboors } from 'app/root-store/neighboor/neighboor-selector';

import { UpgradeTabsAffected } from '@core/models/upgrade';
@Component({
    selector: 'mowing',
    templateUrl: './mowing.component.html',
    styleUrls: ['./mowing.component.scss'],
})
export class MowingComponent implements OnInit {
    upgradeTab: UpgradeTabsAffected = 'mowing';
    neighboors$: Observable<Neighboor[]> = this.store.select(getAllNeighboors);
    constructor(private store: Store<RootStoreState.State>) {}

    ngOnInit(): void {}

    trackByFunction(index: number, object: Neighboor) {
        return object.id;
    }
}
