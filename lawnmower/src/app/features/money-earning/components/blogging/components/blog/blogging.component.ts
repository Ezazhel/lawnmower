import { Component, OnInit } from '@angular/core';
import { Blogging } from '@core/models/blogging';
import { Creativity, Imagination } from '@core/models/currency';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { selectBlogging, selectImagination } from 'app/root-store/blogging/blogging-selector';
import { combineLatest, Observable } from 'rxjs';
import { earnCreativity, earnImagination } from '../../../../../../root-store/blogging/blogging-action';
import { IdlingService } from '@core/services/idling.service';
import { selectCreativity } from '../../../../../../root-store/blogging/blogging-selector';
import { incrementTotalImagination, incrementTotalCreativity } from '../../../../../../root-store/stats/stats-action';
import { Upgrade } from '@core/models/upgrade';
import { selectBloggingUpgradeLevelValue } from 'app/root-store/upgrades/upgrades-selector';
import { UpgradeTabsAffected } from '../../../../../../core/models/upgrade';

@Component({
    selector: 'blogging',
    templateUrl: './blogging.component.html',
    styleUrls: ['./blogging.component.scss'],
})
export class BloggingComponent implements OnInit {
    upgradeTab: UpgradeTabsAffected = 'blogging';
    creation$: Observable<Creativity> = this.store.select(selectCreativity);
    imagination$: Observable<Imagination> = this.store.select(selectImagination);
    blogging$: Observable<Blogging> = this.store.select(selectBlogging);

    upgrades$: Observable<Upgrade[]> = this.store.select(selectBloggingUpgradeLevelValue);

    constructor(private store: Store<RootStoreState.State>, private idlingService: IdlingService) {}

    ngOnInit(): void {}

    think() {
        const think$ = combineLatest([this.idlingService.timer$]).subscribe(([timer]) => {
            this.store.dispatch(earnImagination({ amount: timer.deltaTime }));
            this.store.dispatch(incrementTotalImagination({ imagination: timer.deltaTime }));
        });
    }
    create() {
        const create$ = combineLatest([this.idlingService.timer$]).subscribe(([timer]) => {
            this.store.dispatch(earnCreativity({ amount: timer.deltaTime }));
            this.store.dispatch(incrementTotalCreativity({ creativity: timer.deltaTime }));
        });
    }
}
