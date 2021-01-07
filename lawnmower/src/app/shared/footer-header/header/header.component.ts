import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RootStoreState, StatsSelector } from 'app/root-store';
import { Observable } from 'rxjs';
import { selectMoney } from '../../../root-store/earning/earning-selector';
@Component({
    selector: 'app-header',
    template: `
        <header>
            <mat-toolbar color="primary">
                <div fxHide.gt-xs>
                    <button mat-icon-button (click)="onToggleSideNav()">
                        <mat-icon>menu</mat-icon>
                    </button>
                </div>
                <div>Lawnmoner</div>
                <span> money : {{ money$ | async | exponential }}$ </span>
            </mat-toolbar>
        </header>
    `,
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Output() public sidenavToggle = new EventEmitter();
    public money$: Observable<number> = this.store.pipe(select(selectMoney));
    constructor(private store: Store<RootStoreState.State>) {}

    ngOnInit(): void {}
    onToggleSideNav = () => {
        this.sidenavToggle.emit();
    };
}
