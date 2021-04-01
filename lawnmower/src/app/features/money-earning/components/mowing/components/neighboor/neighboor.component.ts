import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Neighboor } from '@core/models/neighboor';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { insertOrUpdateNeighboorToCut, removeNeighboorFromCuttingList } from '../../../../../../root-store/neighboor/neighboor-action';

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

    wasClicked:  boolean = false;

    ngOnInit(): void {}

    cut() {
        this.wasClicked = !this.wasClicked;
        
        if(this.wasClicked){
            this.store.dispatch(insertOrUpdateNeighboorToCut({ id: this.neighboor.id, cutted: 0 }));
            return;
        }
        
        this.store.dispatch(removeNeighboorFromCuttingList({ id: this.neighboor.id }));
    }
}
