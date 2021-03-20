import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { Observable } from 'rxjs';
import { selectMoney } from '../../../root-store/earning/earning-selector';
import { selectImagination, selectCreativity } from '../../../root-store/blogging/blogging-selector';
import { Imagination, Creativity } from '@core/models/currency';
import { selectStatsState } from 'app/root-store/stats/stats-selector';
@Component({
    selector: 'app-header',
    template: `
        <header>
            <mat-toolbar color="primary" fxLayout="column">
                <div>Lawnmoner</div>
                <div fxLayout="row" fxLayoutAlign="space-evenly center" class="w-100">
                    <label> {{ money$ | async | exponential }}$ </label>
                    <ng-container *ngIf="stats$ | async as stats">
                        <label *ngIf="stats.totalImagination > 0">
                            imagination : {{ (imagination$ | async).amount | exponential }}
                        </label>
                        <label *ngIf="stats.totalCreativity > 0">
                            creativity : {{ (creativity$ | async).amount | exponential }}
                        </label>
                    </ng-container>
                </div>
            </mat-toolbar>
        </header>
    `,
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Output() public sidenavToggle = new EventEmitter();
    public money$: Observable<number> = this.store.pipe(select(selectMoney));
    public stats$ = this.store.select(selectStatsState);
    public imagination$: Observable<Imagination> = this.store.select(selectImagination);
    public creativity$: Observable<Creativity> = this.store.select(selectCreativity);

    constructor(private store: Store<RootStoreState.State>) {}

    ngOnInit(): void {}
    onToggleSideNav = () => {
        this.sidenavToggle.emit();
    };
}
