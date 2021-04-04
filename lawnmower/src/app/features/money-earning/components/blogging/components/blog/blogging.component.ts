import { selectIdea } from './../../../../../../root-store/blogging/blogging-selector';
import { withLatestFrom } from 'rxjs/operators';
import { getIdea, setIsCreating } from './../../../../../../root-store/blogging/blogging-action';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Blogging } from '@core/models/blogging';
import { Creativity, Imagination } from '@core/models/currency';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { selectBlogging, selectIsThinking } from 'app/root-store/blogging/blogging-selector';
import { Observable, Subject } from 'rxjs';
import { IdlingService } from '@core/services/idling.service';
import { Upgrade, UpgradeTabsAffected } from '@core/models/upgrade';
import { selectBloggingUpgradeLevelValue } from 'app/root-store/upgrades/upgrades-selector';
import { selectCreativity, selectImagination } from 'app/root-store/earning/earning-selector';
import { earnCurrency } from 'app/root-store/earning/earning-action';
import { setIsThinking } from 'app/root-store/blogging/blogging-action';

@Component({
    selector: 'blogging',
    templateUrl: './blogging.component.html',
    styleUrls: ['./blogging.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BloggingComponent implements OnInit {
    upgradeTab: UpgradeTabsAffected = 'blogging';
    creation$: Observable<Creativity> = this.store.select(selectCreativity);

    imagination$: Observable<Imagination> = this.store.select(selectImagination);
    isThinking$: Observable<boolean> = this.store.select(selectIsThinking);

    blogging$: Observable<Blogging> = this.store.select(selectBlogging);

    upgrades$: Observable<Upgrade[]> = this.store.select(selectBloggingUpgradeLevelValue);

    idea$ = this.store.select(selectIdea);
    doGetIdea$: Subject<void> = new Subject();

    constructor(private store: Store<RootStoreState.State>, private idlingService: IdlingService) {}

    ngOnInit(): void {}

    getIdeaSubscription = this.doGetIdea$
        .pipe(
            withLatestFrom(this.imagination$, this.idea$, (_, imagination, idea) => {
                if ((imagination?.amount ?? 0) <= idea.price()) return;
                this.store.dispatch(getIdea());
                this.store.dispatch(earnCurrency({ currency: { ...imagination, amount: -idea.price() } }));
            }),
        )
        .subscribe();

    think() {
        this.store.dispatch(setIsThinking());
    }

    create() {
        this.store.dispatch(setIsCreating());
    }
}
