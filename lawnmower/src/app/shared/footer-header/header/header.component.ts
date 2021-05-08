import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { Observable } from 'rxjs';
import { selectMoney, selectImagination, selectCreation } from '@root-store/earning/earning-selector';
import { Imagination, CreationPoint, Money } from '@core/models/Currencies';
import { selectStatsState } from 'app/root-store/stats/stats-selector';
@Component({
    selector: 'app-header',
    template: `
        <header>
            <mat-toolbar color="primary" fxLayout="column">
                <div>Lawnmoner</div>
                <div fxLayout="row" fxLayoutAlign="space-evenly center" class="w-100">
                    <label> {{ (money$ | async).amount | exponential }}$ </label>
                    <ng-container *ngIf="stats$ | async as stats">
                        <label *ngIf="stats.totalImagination > 0 && imagination$ | async as imagination">
                            {{ imagination.amount | exponential }}/{{ imagination.limit }}I
                        </label>
                        <label *ngIf="stats.totalCreativity > 0 && creativity$ | async as creativity">
                            {{ creativity.amount | exponential }}C
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
    public money$: Observable<Money> = this.store.select(selectMoney);
    public stats$ = this.store.select(selectStatsState);
    public imagination$: Observable<Imagination> = this.store.select(selectImagination, 'imaginationGain');
    public creativity$: Observable<CreationPoint> = this.store.select(selectCreation);

    constructor(private store: Store<RootStoreState.State>) {}

    ngOnInit(): void {}
    onToggleSideNav = () => {
        this.sidenavToggle.emit();
    };
}
