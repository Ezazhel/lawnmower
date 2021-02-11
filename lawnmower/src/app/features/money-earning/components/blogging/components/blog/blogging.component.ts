import { Component, OnInit } from '@angular/core';
import { Blogging, Creativity, Imagination } from '@core/models/blogging';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { selectBlogging, selectImagination } from 'app/root-store/blogging/blogging-selector';
import { combineLatest, Observable } from 'rxjs';
import { earnCreativity, earnImagination } from '../../../../../../root-store/blogging/blogging-action';
import { IdlingService } from '../../../../../../core/services/idling.service';
import { selectCreativity } from '../../../../../../root-store/blogging/blogging-selector';
import { incrementTotalImagination, incrementTotalCreativity } from '../../../../../../root-store/stats/stats-action';

@Component({
    selector: 'blogging',
    templateUrl: './blogging.component.html',
    styleUrls: ['./blogging.component.scss'],
})
export class BloggingComponent implements OnInit {
    creation$: Observable<Creativity> = this.store.select(selectCreativity);
    imagination$: Observable<Imagination> = this.store.select(selectImagination);
    blogging$: Observable<Blogging> = this.store.select(selectBlogging);
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
