import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Neighboor } from '@core/models/neighboor';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { insertOrUpdateNeighboorToCut } from '../../../../../../root-store/neighboor/neighboor-action';

@Component({
    selector: 'app-neighboor',
    templateUrl: './neighboor.component.html',
    styleUrls: ['./neighboor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeighboorComponent implements OnInit {
    @Input()
    neighboor: Neighboor;

    @Input()
    timer: { time: number; deltaTime: number };

    @Output('onCut')
    onCut: EventEmitter<Neighboor> = new EventEmitter();

    constructor(private store: Store<RootStoreState.State>) {}

    ngOnInit(): void {}

    cut() {
        if (this.neighboor.cutPercent == 0) {
            this.store.dispatch(insertOrUpdateNeighboorToCut({ id: this.neighboor.id, cutted: 0 }));
        }
    }
}
