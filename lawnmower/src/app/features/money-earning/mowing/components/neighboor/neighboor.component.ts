import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Neighboor } from '@core/models/neighboor';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { insertNeighboorToCut, removeNeighboorFromCuttingList } from '@root-store/neighboor/neighboor-action';

@Component({
    selector: 'app-neighboor',
    templateUrl: './neighboor.component.html',
    styleUrls: ['./neighboor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeighboorComponent implements OnInit {
    @Input()
    neighboor: Neighboor;
    constructor(private store: Store<RootStoreState.State>) {}

    ngOnInit(): void {}

    textToDisplay = () => {
        if (this.neighboor.cutPercent == 0 && !this.neighboor.selected) return '(click me)';
        if (this.neighboor.cutPercent > 0 && !this.neighboor.selected) return '(paused)';
        if (this.neighboor.cutPercent > 0) return '(cutting)';
        if (this.neighboor.cutPercent == 0 && this.neighboor.selected) return '(will cut or click)';
    };

    cut() {
        if (!this.neighboor.selected || (this.neighboor.selected && this.neighboor.cutPercent == 0)) {
            this.store.dispatch(insertNeighboorToCut({ id: this.neighboor.id, cutted: 0 }));
            return;
        }
        this.store.dispatch(removeNeighboorFromCuttingList({ id: this.neighboor.id, unselect: true }));
    }
}
