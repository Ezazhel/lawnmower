import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Blogging } from '@core/models/blogging';

import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { selectBlogging } from 'app/root-store/blogging/blogging-selector';
import { Observable } from 'rxjs';
import { IdlingService } from '@core/services/idling.service';
import { Upgrade, UpgradeTabsAffected } from '@core/models/upgrade';
import { selectBloggingUpgradeLevelValue } from 'app/root-store/upgrades/upgrades-selector';

@Component({
    selector: 'blogging',
    templateUrl: './blogging.component.html',
    styleUrls: ['./blogging.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BloggingComponent implements OnInit {
    upgradeTab: UpgradeTabsAffected = 'blogging';
    blogging$: Observable<Blogging> = this.store.select(selectBlogging);

    upgrades$: Observable<Upgrade[]> = this.store.select(selectBloggingUpgradeLevelValue);

    constructor(private store: Store<RootStoreState.State>, private idlingService: IdlingService) {}

    ngOnInit(): void {}
}
